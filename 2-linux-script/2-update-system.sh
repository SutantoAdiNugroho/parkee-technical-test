#!/bin/bash

# contoh penggunaan
# sudo ./2-update-system.sh

LOGFILE="/var/log/system_update.log"
DATE=$(date +"%Y-%m-%d %H:%M:%S")

# check package manager
if command -v apt &> /dev/null; then
    PACKAGE_MANAGER="apt"
elif command -v yum &> /dev/null; then
    PACKAGE_MANAGER="yum"
elif command -v dnf &> /dev/null; then
    PACKAGE_MANAGER="dnf"
elif command -v zypper &> /dev/null; then
    PACKAGE_MANAGER="zypper"
else
    echo "Tidak ada package manager yang didukung" | tee -a "$LOGFILE"
    exit 1
fi

echo "[$DATE] Memulai pembaruan sistem menggunakan $PACKAGE_MANAGER..." | tee -a "$LOGFILE"
# execute update command
if [ "$PACKAGE_MANAGER" == "apt" ]; then
    # Debian/Ubuntu
    sudo apt update && sudo apt upgrade -y | tee -a "$LOGFILE"
elif [ "$PACKAGE_MANAGER" == "yum" ] || [ "$PACKAGE_MANAGER" == "dnf" ]; then
    # CentOS/RHEL/Fedora
    sudo $PACKAGE_MANAGER update -y | tee -a "$LOGFILE"
elif [ "$PACKAGE_MANAGER" == "zypper" ]; then
    # openSUSE
    sudo zypper update -y | tee -a "$LOGFILE"
fi

if [ $? -eq 0 ]; then
    echo "[$DATE] Pembaruan sistem selesai" | tee -a "$LOGFILE"
else
    echo "[$DATE] Pembaruan sistem gagal" | tee -a "$LOGFILE"
fi