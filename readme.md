# PARKEE Technical Test Assignment

### 1. Java Data Structure

Direktori: 1-java-data-structure

Berisi kode Java untuk untuk mengimplementasikan Single Linked List di Java tanpa menggunakan library List. Serta penjelasan hasil analisa memory terhadap kode `PairSum.java`

### 2. Linux Script

Direktori: 2-linux-script

Berisi kumpulan shell script yang terkait dengan task Linux.
1. Pencarian File Berdasarkan Ekstensi file
    
    Berada pada file `1-find-files-by-extension.sh` 
    
    Contoh penggunaan:
    ```bash
    sudo ./1-find-files-by-extension.sh /home/user/pictures .jpg
    ```

2. Automasi Pembaharuan Sistem
    
    Berada pada file `2-update-system.sh` 
    
    Contoh penggunaan:
    ```bash
    sudo ./2-update-system.sh
    ```

3. Membuat dan Menyimpan SSH Key
    
    Berada pada file `3-create-ssh-key.sh` 
    
    Contoh penggunaan:
    ```bash
    sudo ./3-create-ssh-key.sh /home/ssh
    ```

4. Pengelolaan Service
    
    Berada pada file `4-manage-service.sh` 
    
    Contoh penggunaan:
    ```bash
    sudo ./4-manage-service.sh status nginx
    ```

5. Men-copy Direktori ke Server Remote
    
    Berada pada file `5-copy-rsync.sh` dan `5-copy-scp.sh`

    Contoh penggunaan copy dengan rsync:
    ```bash
    sudo ./5-copy-rsync.sh /path/to/local/file.txt user_remote 192.168.1.100
    ```

    Contoh penggunaan copy dengan scp:
    ```bash
    sudo./5-copy-scp.sh /path/to/local/file.txt user_remote 192.168.1.100
    ```

### 3. Coordination With Support and Engineer Team

Direktori: `3-coordination-with-support-engineer`

Berisi jawaban saya jika terdapat critical issue yang mempengaruhi sistem production dan memerlukan koordinasi dengan tim support dan engineer.

### 4. Python Scripting Data

Direktori: `4-scripting-data`

Berisi kode python untuk mengkalkulasi perhitungan total sales per branch, dengan menggabungkan beberapa file csv dan pembersihan data untuk memudahkan analisis.

Sebelum script dijalankan, pastikan di local computer sudah:
1. Menginstall [Python](https://www.python.org/downloads/)
2. Menuju scripting directory dan menginstall pandas
    ```bash
    cd ./4-scripting-data
    ```

    ```bash
    pip install pandas
    ```

Contoh penggunaan:
```bash
python ./data_processing.py
```

### 5. Parking POS App

#### Requirement
Untuk menjalankan aplikasi ini, harus memiliki perangkat lunak berikut terinstal di local computer:
    
* Java Development Kit (JDK) versi 17 or higher
* Maven versi 3.8.5 or higher
* Node.js versi 18 or higher
* Node.js versi 18 or higher
* Docker dan Docker Compose (optional, jika ingin menjalankan menggunakan Docker)
* PostgreSQL (optional, jika tidak menggunakan Docker Compose untuk database)

#### Struktur Database
Berikut adalah DDL untuk tabel yang digunakan
```SQL
-- DDL untuk tabel `parking_ticket`
CREATE TABLE parking_ticket (
    id UUID PRIMARY KEY NOT NULL,
    license_plate VARCHAR(255) NOT NULL,
    check_in_time TIMESTAMP NOT NULL,
    check_out_time TIMESTAMP,
    total_price DECIMAL(10, 2),
    status VARCHAR(50) NOT NULL,
    payment_type VARCHAR(20) NULL,
    vehicle_type VARCHAR(20) NOT NULL
);
```

#### Cara Menjalankan Aplikasi POS

#### 1. Dengan Docker Compose
Cara ini akan menjalankan backend, frontend dan DB PostgreSQL dalam lingkungan docker yang terisolasi
1. Pastikan telah menginstal Docker dan Docker Compose
2. Buka terminal di direktori `5-parking-pos-app`
3. Jalankan command berikut:
    ```bash
    docker compose up --build
    ```
4. Tunggu hingga semua service berjalan. Untuk menjalankan pertama kali akan membutuhkan waktu relatif lebih lama karena Maven harus mengunduh semua project dependencies dari online repository
5. Akses frontend di `http://127.0.0.1:3000` dan backend di `http://127.0.0.1:8080`

#### 2. Tanpa Docker Compose
Untuk menjalankan secara manual, kita harus menjalankan service bagian secara terpisah

* Database

    Pastikan sudah memiliki server PostgreSQL yang berjalan dan perbarui konfigurasi `application.properties` di backend dengan kredensial database yg sudah berjalan tersebut.

* Menjalankan Backend

    - Buka terminal di direktori `5-parking-pos-app/be-parking-pos`
    - Jalankan aplikasi backend (Spring Boot):
    ```bash
    mvn spring-boot:run
    ```
    - Aplikasi backend akan berjalan pada `http://localhost:8080`

* Menjalankan Frontend

    - Buka terminal di direktori `5-parking-pos-app/fe-parking-pos`
    - Install dependencies:
    ```bash
    npm install
    ```
    - Jalankan aplikasi:
    ```bash
    npm run dev
    ```
    - Akses aplikasi di `http://localhost:3000`
