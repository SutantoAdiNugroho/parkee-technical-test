import pandas as pd
import os

def process_transaction_data(file_paths, output_filename='total_sales_per_branch.csv'):
    all_data = []

    # find files in file_paths
    for file_path in file_paths:
        if os.path.exists(file_path):
            df = pd.read_csv(file_path)
            df['branch'] = os.path.basename(file_path).split('.')[0]
            all_data.append(df)
        else:
            print(f"File '{file_path}' tidak ditemukan")

    if not all_data:
        print("Tidak ada file yang ditemukan")
        return

    combined_df = pd.concat(all_data, ignore_index=True)

    print(combined_df)

    # remove row dengan NaN value di dalam kolom transaction_id, date atau customer_id
    combined_df.dropna(subset=['transaction_id', 'date', 'customer_id'], inplace=True)

    # merubah value dari kolom date menjadi datetime
    combined_df['date'] = pd.to_datetime(combined_df['date'])

    # menghapus duplikat row berdasarkan transaction_id
    cleaned_df = combined_df.sort_values('date', ascending=False).drop_duplicates(subset=['transaction_id'])

    # perhitungan total sales dan print hasilnya
    total_sales = cleaned_df.groupby('branch')['price'].sum().reset_index()
    total_sales.rename(columns={'price': 'total_sales'}, inplace=True)
    print("Hasil perhitungan total sales per branch")
    print("-" * 50)
    print(total_sales)

    # menyimpan hasil ke file CSV baru
    print(f"\nMenyimpan hasil perhitungan ke '{output_filename}'")
    total_sales.to_csv(output_filename, index=False)

if __name__ == "__main__":
    csv_files = ['branch_a.csv', 'branch_b.csv', 'branch_c.csv']

    process_transaction_data(csv_files)

    # delete CSV files
    os.remove('branch_a.csv')
    os.remove('branch_b.csv')
    os.remove('branch_c.csv')
    # os.remove('total_sales_per_branch.csv')