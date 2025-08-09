#!/bin/bash

# contoh penggunaan
# ./5-copy-scp.sh /path/to/local/file.txt user_remote 192.168.1.100

# check apakah inputan sudah benar
if [ "$#" -ne 3 ]; then
    echo "Contoh penggunaan: $0 /path/to/local/file.txt user_remote 192.168.1.100"
    exit 1
fi

SOURCE_FILE="$1"
USERNAME="$2"
IP_ADDRESS="$3"
DEST_PATH="/home/$USERNAME/"

if [ ! -e "$SOURCE_FILE" ]; then
    echo "Error: File sumber tidak ditemukan"
    exit 1
fi

echo "Menyalin '$SOURCE_FILE' ke server..."

# execute perintah scp
scp -r "$SOURCE_FILE" "$USERNAME@$IP_ADDRESS:$DEST_PATH"

# check status keluar dari scp
if [ $? -eq 0 ]; then
    echo "Penyalinan berhasil"
else
    echo "Penyalinan gagal. Periksa kembali credential server/koneksi jaringan."
    exit 1
fi