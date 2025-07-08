#!/usr/bin/env python3
"""
AES-CBC Decryption Solution for Challenge 7
Password: gxvkcegt42 (used directly, padded with zeros to 32 bytes)
"""

from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import sys

def decrypt_aes_cbc_with_padded_password(filename, password):
    """
    Decrypt AES-CBC using password padded with zeros to 32 bytes
    IV is the first 16 bytes of the encrypted file
    """
    # Read the encrypted file
    with open(filename, 'rb') as f:
        encrypted_data = f.read()
    
    # Extract IV (first 16 bytes) and ciphertext
    iv = encrypted_data[:16]
    ciphertext = encrypted_data[16:]
    
    # Create key by padding password with zeros to 32 bytes
    key = password.encode('utf-8').ljust(32, b'\x00')
    
    # Create cipher
    cipher = Cipher(
        algorithms.AES(key),
        modes.CBC(iv),
        backend=default_backend()
    )
    
    # Decrypt
    decryptor = cipher.decryptor()
    decrypted = decryptor.update(ciphertext) + decryptor.finalize()
    
    # Remove PKCS7 padding
    padding_length = decrypted[-1]
    decrypted = decrypted[:-padding_length]
    
    return decrypted.decode('utf-8', errors='ignore')

if __name__ == "__main__":
    # The solution that worked
    password = "gxvkcegt42"
    filename = "access_enc.txt"
    
    print(f"Decrypting with password: {password}")
    print(f"Method: AES-256-CBC with zero-padded password")
    print("-" * 50)
    
    result = decrypt_aes_cbc_with_padded_password(filename, password)
    print(result)