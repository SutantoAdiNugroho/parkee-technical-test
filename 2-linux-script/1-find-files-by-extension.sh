#!/bin/bash

# contoh penggunaan
# sudo ./1-find-files-by-extension.sh /home/user/pictures .jpg

# check apakah inputan sudah benar
if [ "$#" -ne 2 ]; then
    echo "Contoh penggunaan: $0 /home/user .txt"
    exit 1
fi

# mengambil parameter folder dan ekstensi
folder=$1
extension=$2

# Memeriksa apakah folder exists
if [ ! -d "$folder" ]; then
    echo "Error: folder '$folder' tidak ditemukan"
    exit 1
fi

echo "Mencari file..."
echo

# menggunakan command find untuk mencari file berdasarkan ekstensi
find "$folder" -type f -name "*${extension}"

# tampilkan pesan hasil pencarian
if [ $? -eq 0 ]; then
    echo
    echo "Pencarian selesai"
else
    echo
    echo "Tidak ada file yang ditemukan"
fi