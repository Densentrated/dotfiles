#!/usr/bin/env python3

import os
import subprocess
import sys


def check_sudo():
    """Check if the script is running with sudo privileges"""
    if os.geteuid() != 0:
        print("❌ Error: This script must be run with sudo privileges!")
        print("Please run: sudo python3 install_packages.py")
        sys.exit(1)
    print("✅ Running with sudo privileges")


def run_command(command, description="", check_return=True):
    """Run a shell command and handle errors"""
    print(f"🔄 {description}")
    print(f"Running: {command}")

    try:
        result = subprocess.run(
            command, shell=True, check=check_return, capture_output=True, text=True
        )
        if result.stdout:
            print(result.stdout)
        return result.returncode == 0
    except subprocess.CalledProcessError as e:
        print(f"❌ Command failed: {e}")
        if e.stderr:
            print(f"Error output: {e.stderr}")
        return False


def install_paru():
    """Install paru AUR helper"""
    print("\n📦 Installing paru AUR helper...")

    # Check if paru is already installed
    if run_command("which paru", "Checking if paru is installed", check_return=False):
        print("✅ paru is already installed")
        return True

    # Install git and base-devel if not present
    if not run_command(
        "pacman -S --noconfirm git base-devel", "Installing git and base-devel"
    ):
        return False

    # Get the actual user (not root when using sudo)
    actual_user = os.environ.get("SUDO_USER")
    if not actual_user:
        print("❌ Could not determine actual user")
        return False

    # Clone and build paru as the actual user
    home_dir = f"/home/{actual_user}"
    paru_dir = f"{home_dir}/paru"

    commands = [
        f"sudo -u {actual_user} git clone https://aur.archlinux.org/paru.git {paru_dir}",
        f"cd {paru_dir} && sudo -u {actual_user} makepkg -si --noconfirm",
        f"rm -rf {paru_dir}",
    ]

    for cmd in commands:
        if not run_command(cmd, f"Building paru: {cmd.split('&&')[-1].strip()}"):
            return False

    print("✅ paru installed successfully")
    return True


def install_packages():
    """Install all required packages"""
    print("\n📦 Installing packages...")

    # Packages to install with pacman
    pacman_packages = [
        "fish",
        "zsh",
        "neofetch",
        "fastfetch",
        "kitty",
        "wofi",
        "mako",
        "sddm",
        "htop",
        "hyprpaper",
        "cava",
        "cmatrix",
        "cbonsai",
    ]

    # Packages to install with paru (AUR packages)
    paru_packages = [
        "xwayland-satellite",
        "starship",
        "niri",
        "quickshell-git",
        "hyprland",  # includes hyprctl
        "spicetify-cli",
        "pipes.sh",
        "donut.c",
        "termdown",
    ]

    # Install pacman packages
    pacman_cmd = f"pacman -S --noconfirm {' '.join(pacman_packages)}"
    if not run_command(pacman_cmd, "Installing packages with pacman"):
        print("⚠️  Some pacman packages failed to install")

    # Get the actual user for paru commands
    actual_user = os.environ.get("SUDO_USER")
    if actual_user:
        # Install paru packages
        for package in paru_packages:
            paru_cmd = f"sudo -u {actual_user} paru -S --noconfirm {package}"
            if not run_command(
                paru_cmd, f"Installing {package} with paru", check_return=False
            ):
                print(f"⚠️  Failed to install {package}")
    else:
        print("⚠️  Could not install AUR packages - no actual user found")


def setup_zsh_default():
    """Set zsh as default shell"""
    print("\n🐚 Setting up zsh as default shell...")

    actual_user = os.environ.get("SUDO_USER")
    if not actual_user:
        print("⚠️  Could not determine actual user for shell setup")
        return

    # Change default shell to zsh
    zsh_path = "/usr/bin/zsh"
    if os.path.exists(zsh_path):
        run_command(f"chsh -s {zsh_path} {actual_user}", "Setting zsh as default shell")
        print("✅ zsh set as default shell")
    else:
        print("⚠️  zsh not found, skipping shell change")


def setup_niri_spotify():
    """Add spotify script configuration note for niri"""
    print("\n🎵 Niri Spotify Configuration Note:")
    print("📝 To add spotify script to niri execution, you'll need to:")
    print("   1. Create a spotify control script")
    print("   2. Add keybindings to your niri config (~/.config/niri/config.kdl)")
    print("   3. Example keybinding:")
    print('      bind "Mod+Shift+p" { spawn "playerctl" "play-pause"; }')
    print("   Make sure to configure this manually after installation completes.")


def prompt_user(question):
    """Prompt user for yes/no input"""
    while True:
        try:
            response = input(f"{question} (y/n): ").lower().strip()
            if response in ["y", "yes"]:
                return True
            elif response in ["n", "no"]:
                return False
            else:
                print("Please enter 'y' or 'n'")
        except KeyboardInterrupt:
            print("\n\nExiting...")
            sys.exit(0)


def install_git_credential_manager():
    """Install Git Credential Manager"""
    print("\n🔐 Installing Git Credential Manager...")

    actual_user = os.environ.get("SUDO_USER")
    if not actual_user:
        print("⚠️  Could not determine actual user")
        return False

    # Install build dependencies
    build_deps = ["dotnet-sdk", "git"]
    pacman_cmd = f"pacman -S --noconfirm {' '.join(build_deps)}"
    if not run_command(
        pacman_cmd, "Installing Git Credential Manager build dependencies"
    ):
        print("⚠️  Failed to install build dependencies")
        return False

    # Install via paru
    paru_cmd = f"sudo -u {actual_user} paru -S --noconfirm git-credential-manager-core"
    if run_command(paru_cmd, "Installing Git Credential Manager", check_return=False):
        print("✅ Git Credential Manager installed successfully")
        return True
    else:
        print("⚠️  Failed to install Git Credential Manager")
        return False


def setup_vscode_settings_sync():
    """Provide instructions for VSCode settings sync"""
    print("\n⚙️  VSCode Settings Sync Configuration:")
    print("📝 To enable settings sync in VSCode:")
    print("   1. Open VSCode")
    print("   2. Press Ctrl+Shift+P")
    print("   3. Type 'Settings Sync: Turn On'")
    print("   4. Choose 'Sign in & Turn on'")
    print("   5. Sign in with GitHub or Microsoft account")
    print("   6. Select what to sync (settings, keybindings, extensions, etc.)")
    print("   This needs to be done manually after VSCode is installed.")


def install_personal_apps():
    """Install personal favorite applications"""
    print("\n" + "=" * 50)
    print("🎯 Personal Favorite Applications")
    print("=" * 50)

    if not prompt_user("Would you like to install personal favorite applications?"):
        print("⏭️  Skipping personal applications installation")
        return

    actual_user = os.environ.get("SUDO_USER")
    if not actual_user:
        print("⚠️  Could not determine actual user for personal apps")
        return

    print("\n📱 Installing personal favorite applications...")

    # Pacman packages (official repos)
    pacman_personal = [
        "obsidian",
        "pass",
        "gnupg",  # gpg
        "docker",
        "docker-compose",
        "podman",
        "podman-compose",
        "virtualbox",
        "emacs",
    ]

    # Paru packages (AUR)
    paru_personal = [
        "zen-browser-bin",
        "zed",
        "visual-studio-code-bin",
        "spotify",
    ]

    # Install pacman packages
    print("\n📦 Installing applications from official repositories...")
    for package in pacman_personal:
        pacman_cmd = f"pacman -S --noconfirm {package}"
        if not run_command(pacman_cmd, f"Installing {package}", check_return=False):
            print(f"⚠️  Failed to install {package}")

    # Install paru packages
    print("\n📦 Installing applications from AUR...")
    for package in paru_personal:
        paru_cmd = f"sudo -u {actual_user} paru -S --noconfirm {package}"
        if not run_command(paru_cmd, f"Installing {package}", check_return=False):
            print(f"⚠️  Failed to install {package}")

    # Install Git Credential Manager
    install_git_credential_manager()

    # Show VSCode settings sync instructions
    setup_vscode_settings_sync()

    print("\n✅ Personal applications installation completed!")
    print("\n📋 Personal applications installed:")
    print("   • Zen Browser")
    print("   • Zed Editor")
    print("   • Visual Studio Code")
    print("   • Obsidian")
    print("   • Spotify")
    print("   • Git Credential Manager")
    print("   • Pass (password manager)")
    print("   • GPG")
    print("   • Docker & Docker Compose")
    print("   • Podman & Podman Compose")
    print("   • VirtualBox")
    print("   • Emacs")


def main():
    """Main installation function"""
    print("🚀 Starting package installation script...")
    print("=" * 50)

    # Check sudo privileges
    check_sudo()

    # Update system first
    if not run_command("pacman -Syu --noconfirm", "Updating system packages"):
        print("⚠️  System update failed, continuing anyway...")

    # Install paru
    if not install_paru():
        print("❌ Failed to install paru, some AUR packages may not be available")

    # Install all packages
    install_packages()

    # Setup zsh as default shell
    setup_zsh_default()

    # Show niri spotify configuration note
    setup_niri_spotify()

    # Install personal applications (with user prompt)
    install_personal_apps()

    print("\n" + "=" * 50)
    print("🎉 Installation script completed!")
    print("\n📋 Core packages installed:")
    print("   • paru (AUR helper)")
    print("   • xwayland-satellite")
    print("   • fish")
    print("   • zsh (set as default shell)")
    print("   • neofetch")
    print("   • fastfetch")
    print("   • starship")
    print("   • kitty")
    print("   • niri")
    print("   • quickshell")
    print("   • wofi")
    print("   • mako")
    print("   • sddm")
    print("   • htop")
    print("   • hyprland (includes hyprctl)")
    print("   • hyprpaper")
    print("   • spicetify")
    print("   • cava (audio visualizer)")
    print("   • cmatrix (matrix rain)")
    print("   • cbonsai (bonsai tree)")
    print("   • pipes.sh (animated pipes)")
    print("   • donut.c (spinning donut)")
    print("   • termdown (terminal countdown timer)")
    print(
        "\n⚠️  Note: You may need to log out and back in for shell changes to take effect."
    )
    print("💡 Don't forget to configure niri spotify keybindings manually!")
    print("💡 Don't forget to enable VSCode settings sync manually!")


if __name__ == "__main__":
    main()
