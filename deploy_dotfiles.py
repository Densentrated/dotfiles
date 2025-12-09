#!/usr/bin/env python3

import os
import shutil
import sys
from pathlib import Path


def check_sudo():
    """Check if the script is running with sudo privileges"""
    if os.geteuid() != 0:
        print("❌ Error: This script must be run with sudo privileges!")
        print("Please run: sudo python3 deploy_dotfiles.py")
        sys.exit(1)
    print("✅ Running with sudo privileges")


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
    """Check if an item should be excluded from deployment"""
    exclude_list = [
        "pic1.png",
        "pic2.png",
        "pic3.png",
        "LICENSE",
        "README.md",
        "deploy_dotfiles.py",  # Don't deploy this script itself
        "install_packages.py",  # Don't deploy the installer script
        "sync_to_repo.py",  # Don't deploy sync script
        "sddm_background.png",  # SDDM background handled separately
    ]

    return item_name in exclude_list


def backup_existing(source_path, target_path):
    """Create backup of existing files/directories"""
    if target_path.exists():
        backup_path = Path(str(target_path) + ".backup")
        counter = 1

        # Find available backup name
        while backup_path.exists():
            backup_path = Path(str(target_path) + f".backup.{counter}")
            counter += 1

        print(f"📋 Backing up existing {target_path} to {backup_path}")
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


def deploy_config_subdirectory(source_path, home_dir, dry_run=False):
    """Deploy a .config subdirectory to the appropriate location"""
    config_dir = home_dir / ".config"
    target_path = config_dir / source_path.name

    print(f"🔄 Deploying .config/{source_path.name}...")

    if dry_run:
        print(f"   Would copy: {source_path} -> {target_path}")
        return True

    try:
        # Ensure .config directory exists
        config_dir.mkdir(exist_ok=True)

        # Create backup if target exists
        if target_path.exists():
            backup_path = Path(str(target_path) + ".backup")
            counter = 1
            while backup_path.exists():
                backup_path = Path(str(target_path) + f".backup.{counter}")
                counter += 1
            print(f"📋 Backing up existing {target_path} to {backup_path}")
            if target_path.is_dir():
                shutil.copytree(target_path, backup_path)
                shutil.rmtree(target_path)
            else:
                shutil.copy2(target_path, backup_path)
                target_path.unlink()

        # Copy the config subdirectory
        if source_path.is_dir():
            shutil.copytree(source_path, target_path)
        else:
            shutil.copy2(source_path, target_path)

        print(f"✅ Successfully deployed .config/{source_path.name}")

        # Set proper ownership if running as sudo
        actual_user = os.environ.get("SUDO_USER")
        if actual_user and os.geteuid() == 0:
            import pwd

            user_info = pwd.getpwnam(actual_user)
            uid, gid = user_info.pw_uid, user_info.pw_gid

            # Set ownership for .config directory
            os.chown(config_dir, uid, gid)

            # Change ownership recursively for the deployed item
            if target_path.is_dir():
                for root, dirs, files in os.walk(target_path):
                    os.chown(root, uid, gid)
                    for d in dirs:
                        os.chown(os.path.join(root, d), uid, gid)
                    for f in files:
                        os.chown(os.path.join(root, f), uid, gid)
            else:
                os.chown(target_path, uid, gid)

        return True

    except Exception as e:
        print(f"❌ Failed to deploy .config/{source_path.name}: {e}")
        return False


def deploy_item(source_path, home_dir, dry_run=False):
    """Deploy a single file or directory to home"""
    target_path = home_dir / source_path.name

    print(f"🔄 Deploying {source_path.name}...")

    if dry_run:
        print(f"   Would move: {source_path} -> {target_path}")
        return True

    try:
        # Create backup if target exists
        if not backup_existing(source_path, target_path):
            return False

        # Remove existing target if it exists
        if target_path.exists():
            if target_path.is_dir():
                shutil.rmtree(target_path)
            else:
                target_path.unlink()

        # Move the item
        shutil.move(str(source_path), str(target_path))
        print(f"✅ Successfully deployed {source_path.name}")

        # Set proper ownership if running as sudo
        actual_user = os.environ.get("SUDO_USER")
        if actual_user and os.geteuid() == 0:
            # Get user and group IDs
            import pwd

            user_info = pwd.getpwnam(actual_user)
            uid, gid = user_info.pw_uid, user_info.pw_gid

            # Change ownership recursively if it's a directory
            if target_path.is_dir():
                for root, dirs, files in os.walk(target_path):
                    os.chown(root, uid, gid)
                    for d in dirs:
                        os.chown(os.path.join(root, d), uid, gid)
                    for f in files:
                        os.chown(os.path.join(root, f), uid, gid)
            else:
                os.chown(target_path, uid, gid)

        return True

    except Exception as e:
        print(f"❌ Failed to deploy {source_path.name}: {e}")
        return False


def run_command(command, description=""):
    """Run a shell command and handle errors"""
    print(f"🔄 {description}")
    print(f"Running: {command}")

    try:
        result = os.system(command)
        if result == 0:
            print("✅ Command completed successfully")
            return True
        else:
            print(f"❌ Command failed with exit code {result}")
            return False
    except Exception as e:
        print(f"❌ Command failed: {e}")
        return False


def setup_sddm_background(dotfiles_dir, dry_run=False):
    """Setup SDDM background image"""
    print("\n🖼️  Setting up SDDM background...")

    sddm_bg_source = dotfiles_dir / "sddm_background.png"
    sddm_themes_dir = Path("/usr/share/sddm/themes")
    sddm_config_file = Path("/etc/sddm.conf")

    if not sddm_bg_source.exists():
        print("⚠️  SDDM background image not found, skipping SDDM setup")
        return False

    if dry_run:
        print(f"   Would copy {sddm_bg_source} to SDDM themes directory")
        print("   Would configure SDDM to use the background")
        return True

    try:
        # Create SDDM themes directory if it doesn't exist
        if not sddm_themes_dir.exists():
            print(f"📁 Creating SDDM themes directory: {sddm_themes_dir}")
            sddm_themes_dir.mkdir(parents=True, exist_ok=True)

        # Copy background image to SDDM themes
        sddm_bg_target = sddm_themes_dir / "background.png"
        print(f"📋 Copying SDDM background to {sddm_bg_target}")
        shutil.copy2(sddm_bg_source, sddm_bg_target)

        # Create or update SDDM configuration
        sddm_config_content = f"""[Theme]
Current=
CursorTheme=
Font=

[General]
Numlock=none

[X11]
ServerPath=/usr/bin/X
XephyrPath=/usr/bin/Xephyr
SessionCommand=/usr/share/sddm/scripts/Xsession
SessionDir=/usr/share/xsessions
XauthPath=/usr/bin/xauth

[Wayland]
SessionDir=/usr/share/wayland-sessions

[Users]
MaximumUid=60513
MinimumUid=1000

# Custom background configuration
[Theme]
Background={sddm_bg_target}
"""

        # Backup existing SDDM config if it exists
        if sddm_config_file.exists():
            backup_path = Path(str(sddm_config_file) + ".backup")
            print(f"📋 Backing up existing SDDM config to {backup_path}")
            shutil.copy2(sddm_config_file, backup_path)

        # Write new SDDM configuration
        print(f"📝 Writing SDDM configuration to {sddm_config_file}")
        with open(sddm_config_file, "w") as f:
            f.write(sddm_config_content)

        print("✅ SDDM background configured successfully")
        return True

    except Exception as e:
        print(f"❌ Failed to setup SDDM background: {e}")
        return False


def main():
    """Main deployment function"""
    print("🚀 Starting dotfiles deployment...")
    print("=" * 50)

    # Check sudo privileges
    check_sudo()

    # Parse command line arguments
    dry_run = "--dry-run" in sys.argv or "-n" in sys.argv
    force = "--force" in sys.argv or "-f" in sys.argv

    if dry_run:
        print("🔍 DRY RUN MODE - No files will be moved")
        print("=" * 50)

    # Get directories
    dotfiles_dir = get_dotfiles_dir()
    home_dir = get_user_home()

    print(f"📁 Dotfiles directory: {dotfiles_dir}")
    print(f"🏠 Target home directory: {home_dir}")
    print()

    # Check if home directory exists
    if not home_dir.exists():
        print(f"❌ Home directory {home_dir} does not exist!")
        sys.exit(1)

    # Get all items in dotfiles directory
    all_items = list(dotfiles_dir.iterdir())
    regular_items = [
        item
        for item in all_items
        if not should_exclude(item.name) and item.name != ".config"
    ]
    excluded_items = [item for item in all_items if should_exclude(item.name)]

    # Handle .config subdirectories separately
    config_items = []
    config_dir = dotfiles_dir / ".config"
    if config_dir.exists() and config_dir.is_dir():
        config_items = list(config_dir.iterdir())

    print("📋 Regular items to deploy:")
    for item in regular_items:
        item_type = "📁" if item.is_dir() else "📄"
        print(f"   {item_type} {item.name}")

    if config_items:
        print("\n📋 .config subdirectories to deploy:")
        for item in config_items:
            item_type = "📁" if item.is_dir() else "📄"
            print(f"   {item_type} .config/{item.name}")

    print("\n🚫 Items to exclude:")
    for item in excluded_items:
        item_type = "📁" if item.is_dir() else "📄"
        print(f"   {item_type} {item.name}")

    total_items = len(regular_items) + len(config_items)
    if total_items == 0:
        print("\n⚠️  No items to deploy!")
        return

    # Ask for confirmation unless force flag is used
    if not force and not dry_run:
        print(f"\n❓ Deploy {total_items} items to {home_dir}?")
        response = input("Continue? (y/N): ").lower().strip()
        if response not in ["y", "yes"]:
            print("❌ Deployment cancelled")
            return

    print("\n🔄 Starting deployment...")

    # Deploy regular items
    success_count = 0
    for item in regular_items:
        if deploy_item(item, home_dir, dry_run):
            success_count += 1

    # Deploy .config subdirectories
    for item in config_items:
        if deploy_config_subdirectory(item, home_dir, dry_run):
            success_count += 1

    # Setup SDDM background
    print("\n" + "=" * 50)
    print("🖼️  SDDM Background Configuration")
    print("=" * 50)
    setup_sddm_background(dotfiles_dir, dry_run)

    # Summary
    print("\n" + "=" * 50)
    if dry_run:
        print("🔍 Dry run completed!")
        print(f"📊 Would deploy {total_items} items")
    else:
        print("🎉 Deployment completed!")
        print(f"📊 Successfully deployed: {success_count}/{total_items} items")

        if success_count < total_items:
            print("⚠️  Some items failed to deploy - check output above")

        print(f"🏠 Files deployed to: {home_dir}")
        print("💡 Backups were created for any existing files")
        print("🖼️  SDDM background has been configured")
        print("⚠️  You may need to restart SDDM service: sudo systemctl restart sddm")


def print_help():
    """Print help information"""
    print("Dotfiles Deployment Script")
    print("=" * 30)
    print("Usage: sudo python3 deploy_dotfiles.py [OPTIONS]")
    print("Note: Requires sudo privileges for SDDM configuration")
    print()
    print("Options:")
    print("  -n, --dry-run    Show what would be deployed without moving files")
    print("  -f, --force      Deploy without confirmation prompt")
    print("  -h, --help       Show this help message")
    print()
    print("What gets deployed:")
    print("  • Regular directories (Pictures, etc.) → ~/")
    print("  • .config subdirectories → ~/.config/")
    print("  • Dotfiles (.zshrc, .bashrc, etc.) → ~/")
    print()
    print("Excluded files (will not be deployed):")
    print("  • pic1.png, pic2.png, pic3.png")
    print("  • LICENSE")
    print("  • README.md")
    print("  • deploy_dotfiles.py (this script)")
    print("  • install_packages.py")
    print("  • sync_to_repo.py")
    print("  • sddm_background.png (handled separately for SDDM)")


if __name__ == "__main__":
    if "--help" in sys.argv or "-h" in sys.argv:
        print_help()
    else:
        main()
