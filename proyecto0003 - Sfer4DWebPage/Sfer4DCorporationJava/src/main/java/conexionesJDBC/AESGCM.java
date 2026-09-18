package conexionesJDBC;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import java.util.Base64;

public class AESGCM {

    // Genera una clave AES-256
    public static SecretKey generarClave() throws Exception {
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(256); // 256 bits
        return keyGen.generateKey();
    }

    // Cifrar PAN
    public static String cifrar(String pan, SecretKey clave) throws Exception {
        byte[] iv = new byte[12]; // GCM usa IV de 12 bytes
        java.security.SecureRandom random = new java.security.SecureRandom();
        random.nextBytes(iv);

        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec spec = new GCMParameterSpec(128, iv); // 128-bit tag
        cipher.init(Cipher.ENCRYPT_MODE, clave, spec);

        byte[] cifrado = cipher.doFinal(pan.getBytes("UTF-8"));

        // Guardas IV + cifrado juntos
        byte[] combinado = new byte[iv.length + cifrado.length];
        System.arraycopy(iv, 0, combinado, 0, iv.length);
        System.arraycopy(cifrado, 0, combinado, iv.length, cifrado.length);

        return Base64.getEncoder().encodeToString(combinado);
    }

    // Desencriptar PAN
    public static String descifrar(String cifradoBase64, SecretKey clave) throws Exception {
        byte[] combinado = Base64.getDecoder().decode(cifradoBase64);

        byte[] iv = new byte[12];
        byte[] cifrado = new byte[combinado.length - 12];

        System.arraycopy(combinado, 0, iv, 0, 12);
        System.arraycopy(combinado, 12, cifrado, 0, cifrado.length);

        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec spec = new GCMParameterSpec(128, iv);
        cipher.init(Cipher.DECRYPT_MODE, clave, spec);

        byte[] plano = cipher.doFinal(cifrado);
        return new String(plano, "UTF-8");
    }
}
