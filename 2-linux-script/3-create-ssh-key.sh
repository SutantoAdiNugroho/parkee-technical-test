#!/bin/bash

# contoh penggunaan
# ./3-create-ssh-key.sh /home/ssh

# check apakah inputan sudah benar
if [ "$#" -ne 1 ]; then
    echo "Contoh penggunaan: $0 /home/user/.ssh_keys"
    exit 1
fi

# mengambil parameter folder
KEY_DIR="$1"
KEY_NAME="id_rsa"

if [ ! -d "$KEY_DIR" ]; then
    echo "Folder tidak ditemukan, membuat folder..."
    mkdir -p "$KEY_DIR"
    
    if [ $? -ne 0 ]; then
        echo "Error: Gagal membuat folder"
        exit 1
    fi
    echo "Folder berhasil dibuat"
fi

# grant access direktori ssh key berdasarkan parameter
chmod 700 "$KEY_DIR"

echo "Membuat SSH key di dalam '$KEY_DIR'..."
echo

# membuat ssh
sudo ssh-keygen -t rsa -b 4096 -f "$KEY_DIR/$KEY_NAME" -N ""

if [ $? -eq 0 ]; then
    echo
    echo "SSH key berhasil dibuat"
    echo "Private key: $KEY_DIR/$KEY_NAME"
    echo "Public key:  $KEY_DIR/$KEY_NAME.pub"
else
    echo
    echo "Error: Gagal membuat SSH key"
    exit 1
fi