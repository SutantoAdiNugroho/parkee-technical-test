#!/bin/bash

# contoh penggunaan
# ./4-manage-service.sh status nginx

# check apakah inputan sudah benar
if [ "$#" -ne 2 ]; then
    echo "Action yang didukung: start, stop, status"
    echo "Contoh penggunaan: $0 status nginx"
    exit 1
fi

ACTION="$1"
SERVICE_NAME="$2"

if [ "$ACTION" != "start" ] && [ "$ACTION" != "stop" ] && [ "$ACTION" != "status" ]; then
    echo "Error: action tidak didukung"
    exit 1
fi

if ! systemctl list-units --type=service --all | grep -q "$SERVICE_NAME.service"; then
    echo "Error: Service tidak ditemukan atau tidak valid"
    exit 1
fi

echo "Melakukan action '$ACTION' pada service '$SERVICE_NAME'..."

# systemctl untuk mengelola service
sudo systemctl "$ACTION" "$SERVICE_NAME"

if [ $? -eq 0 ]; then
    echo "Action berhasil"
else
    echo "Error: Gagal melakukan action"
fi