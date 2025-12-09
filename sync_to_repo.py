#!/usr/bin/env python3

import filecmp
import os
import shutil
import sys
from pathlib import Path


def get_user_home():
    """Get the actual user's home directory, handling sudo properly"""
    # If running with sudo, get the actual user's home
    actual_user = os.environ.get("SUDO_USER")
    if actual_user:
        return Path(f"/home/{actual_user}")

    # Otherwise use current user's home
    return Path.home()


def get_dotfiles_dir():
    """Get the dotfiles directory (where this script is located)"""
    return Path(__file__).parent.absolute()


def should_exclude(item_name):
    """Check if an item should be excluded from syncing"""
    exclude_list = [
        "pic1.png",
        "pic2.png",
        "pic3.png",
        "LICENSE",
        "README.md",
        "deploy_dotfiles.py",
        "sync_to_repo.py",  # Don't sync this script itself
        "install_packages.py",
    ]

    return item_name in exclude_list


def backup_existing(target_path):
    """Create backup of existing files/directories in repo"""
    if target_path.exists():
        backup_path = Path(str(target_path) + ".old")
        counter = 1

        # Find available backup name
        while backup_path.exists():
            backup_path = Path(str(target_path) + f".old.{counter}")
            counter += 1

        print(f"📋 Backing up existing {target_path.name} to {backup_path.name}")
        try:
            if target_path.is_dir():
                shutil.copytree(target_path, backup_path)
            else:
                shutil.copy2(target_path, backup_path)
            return True
        except Exception as e:
            print(f"⚠️  Failed to backup {target_path}: {e}")
            return False
    return True


def files_are_different(source_path, target_path):
    """Check if two files/directories are different"""
    if not source_path.exists() or not target_path.exists():
        return True

    if source_path.is_file() and target_path.is_file():
        return not filecmp.cmp(source_path, target_path, shallow=False)
    elif source_path.is_dir() and target_path.is_dir():
        # For directories, do a shallow comparison
        comparison = filecmp.dircmp(source_path, target_path)
        return (
            len(comparison.left_only) > 0
            or len(comparison.right_only) > 0
            or len(comparison.diff_files) > 0
            or len(comparison.funny_files) > 0
        )
    else:
        # Different types (file vs directory)
        return True


def sync_directory_additive(source_dir, target_dir):
    """Additively sync a directory - only add/update files, never delete"""
    for item in source_dir.iterdir():
        source_item = source_dir / item.name
        target_item = target_dir / item.name

        if source_item.is_dir():
            # Create target directory if it doesn't exist
            target_item.mkdir(exist_ok=True)
            # Recursively sync subdirectory
            sync_directory_additive(source_item, target_item)
        else:
            # Copy/update file
            shutil.copy2(source_item, target_item)


def sync_item(source_path, target_path, dry_run=False):
    """Sync a single file or directory from home to repo"""
    # Check if this is a .config subdirectory
    if target_path.parent.name == ".config":
        display_name = f".config/{source_path.name}"
    else:
        display_name = source_path.name

    print(f"🔄 Syncing {display_name}...")

    if dry_run:
        if files_are_different(source_path, target_path):
            print(f"   Would update: {source_path} -> {target_path}")
        else:
            print(f"   No changes needed for {display_name}")
        return True

    try:
        # Check if files are different
        if not files_are_different(source_path, target_path):
            print(f"✅ {display_name} is already up to date")
            return True

        # Create backup if target exists
        if not backup_existing(target_path):
            return False

        # Handle directories and files differently
        if source_path.is_file():
            # For files, simply replace
            if target_path.exists():
                target_path.unlink()
            shutil.copy2(source_path, target_path)
        else:
            # For directories, use additive sync
            if not target_path.exists():
                # If target doesn't exist, create it and copy everything
                shutil.copytree(source_path, target_path)
            else:
                # If target exists, additively sync (only add/update, never delete)
                sync_directory_additive(source_path, target_path)

        print(f"✅ Successfully synced {display_name}")
        return True

    except Exception as e:
        print(f"❌ Failed to sync {display_name}: {e}")
        return False


def find_trackable_items(dotfiles_dir, home_dir):
    """Find items that exist in both repo and home directory"""
    trackable_items = []

    # Get all non-excluded items from dotfiles repo
    for item in dotfiles_dir.iterdir():
        if should_exclude(item.name):
            continue

        # Handle .config directory specially - sync subdirectories individually
        if item.name == ".config" and item.is_dir():
            home_config_dir = home_dir / ".config"
            if home_config_dir.exists():
                for config_subdir in item.iterdir():
                    home_config_subdir = home_config_dir / config_subdir.name
                    if home_config_subdir.exists():
                        trackable_items.append((home_config_subdir, config_subdir))
                    else:
                        print(
                            f"⚠️  .config/{config_subdir.name} exists in repo but not in home directory"
                        )
            else:
                print("⚠️  .config directory exists in repo but not in home directory")
        else:
            # Handle regular items
            home_equivalent = home_dir / item.name
            if home_equivalent.exists():
                trackable_items.append((home_equivalent, item))
            else:
                print(f"⚠️  {item.name} exists in repo but not in home directory")

    return trackable_items


def main():
    """Main sync function"""
    print("🔄 Starting dotfiles sync from home to repository...")
    print("=" * 55)

    # Parse command line arguments
    dry_run = "--dry-run" in sys.argv or "-n" in sys.argv
    force = "--force" in sys.argv or "-f" in sys.argv
    check_only = "--check" in sys.argv or "-c" in sys.argv

    if dry_run:
        print("🔍 DRY RUN MODE - No files will be modified")
        print("=" * 55)
    elif check_only:
        print("🔍 CHECK MODE - Only showing differences")
        print("=" * 55)

    # Get directories
    dotfiles_dir = get_dotfiles_dir()
    home_dir = get_user_home()

    print(f"🏠 Home directory: {home_dir}")
    print(f"📁 Dotfiles repository: {dotfiles_dir}")
    print()

    # Check if directories exist
    if not home_dir.exists():
        print(f"❌ Home directory {home_dir} does not exist!")
        sys.exit(1)

    if not dotfiles_dir.exists():
        print(f"❌ Dotfiles directory {dotfiles_dir} does not exist!")
        sys.exit(1)

    # Find trackable items
    trackable_items = find_trackable_items(dotfiles_dir, home_dir)

    if not trackable_items:
        print("⚠️  No trackable items found!")
        print(
            "💡 Items must exist in both home directory and dotfiles repo to be synced"
        )
        return

    print("📋 Trackable items found:")
    differences_found = False

    for home_path, repo_path in trackable_items:
        item_type = "📁" if home_path.is_dir() else "📄"
        # Check if this is a .config subdirectory
        if repo_path.parent.name == ".config":
            display_name = f".config/{home_path.name}"
        else:
            display_name = home_path.name

        if files_are_different(home_path, repo_path):
            print(f"   {item_type} {display_name} (DIFFERENT)")
            differences_found = True
        else:
            print(f"   {item_type} {display_name} (up to date)")

    if check_only:
        if differences_found:
            print("\n📊 Summary: Differences found between home and repo")
            sys.exit(1)
        else:
            print("\n📊 Summary: All files are up to date")
            sys.exit(0)

    if not differences_found and not force:
        print("\n✅ All trackable items are already up to date!")
        return

    # Ask for confirmation unless force flag is used
    if not force and not dry_run:
        print(f"\n❓ Sync {len(trackable_items)} items from home to repository?")
        print(
            "⚠️  This will overwrite files in the repository with home directory versions"
        )
        response = input("Continue? (y/N): ").lower().strip()
        if response not in ["y", "yes"]:
            print("❌ Sync cancelled")
            return

    print("\n🔄 Starting sync...")

    # Sync each item
    success_count = 0
    for home_path, repo_path in trackable_items:
        if sync_item(home_path, repo_path, dry_run):
            success_count += 1

    # Summary
    print("\n" + "=" * 55)
    if dry_run:
        print("🔍 Dry run completed!")
        print(
            f"📊 Would sync {len([item for item in trackable_items if files_are_different(item[0], item[1])])} items"
        )
    else:
        print("🎉 Sync completed!")
        print(f"📊 Successfully synced: {success_count}/{len(trackable_items)} items")

        if success_count < len(trackable_items):
            print("⚠️  Some items failed to sync - check output above")

        print(f"📁 Repository updated: {dotfiles_dir}")
        print("💡 Backups were created for overwritten files (.old suffix)")


def print_help():
    """Print help information"""
    print("Dotfiles Sync Script (Home → Repository)")
    print("=" * 45)
    print("Usage: python3 sync_to_repo.py [OPTIONS]")
    print()
    print("Description:")
    print(
        "  Syncs configuration files from home directory back to dotfiles repository."
    )
    print("  Only syncs items that exist in both locations.")
    print()
    print("Options:")
    print("  -n, --dry-run    Show what would be synced without modifying files")
    print("  -f, --force      Sync without confirmation prompt")
    print("  -c, --check      Only check for differences, exit with code 1 if found")
    print("  -h, --help       Show this help message")
    print()
    print("Excluded files (will not be synced):")
    print("  • pic1.png, pic2.png, pic3.png")
    print("  • LICENSE")
    print("  • README.md")
    print("  • *.py scripts")
    print()
    print("Examples:")
    print("  python3 sync_to_repo.py --check     # Check for differences")
    print("  python3 sync_to_repo.py --dry-run   # Preview changes")
    print("  python3 sync_to_repo.py             # Interactive sync")
    print("  python3 sync_to_repo.py --force     # Sync without confirmation")


if __name__ == "__main__":
    if "--help" in sys.argv or "-h" in sys.argv:
        print_help()
    else:
        main()
