package conexionesJDBC;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.SecureRandom;
import java.util.Base64;

public class SeguridadAES {

    private static final String RUTA_CLAVE = "seguridadClave/claveAES.key";   // fichero donde se guarda la clave
    private static final int TAM_CLAVE = 256;                  // AES-256
    private static final int TAM_IV = 12;                      // IV recomendado para GCM
    private static final int TAM_TAG = 128;                    // Tag de autenticación GCM

    // ============================================================
    // 1. GENERAR CLAVE AES-256 (solo una vez en la vida del proyecto)
    // ============================================================
    public static SecretKey generarClaveAES() throws Exception {
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(TAM_CLAVE);
        return keyGen.generateKey();
    }

    // ============================================================
    // 2. GUARDAR CLAVE EN FICHERO
    // ============================================================
    public static void guardarClaveAES(SecretKey clave) throws Exception {
        byte[] bytesClave = clave.getEncoded();
        Files.write(Paths.get(RUTA_CLAVE), bytesClave);
    }

    // ============================================================
    // 3. CARGAR CLAVE DESDE FICHERO
    // ============================================================
    public static SecretKey cargarClaveAES() throws Exception {
        byte[] bytesClave = Files.readAllBytes(Paths.get(RUTA_CLAVE));
        return new SecretKeySpec(bytesClave, "AES");
    }

    // ============================================================
    // 4. CIFRAR TEXTO CON AES-GCM
    // ============================================================
    public static String cifrar(String textoPlano, SecretKey claveAES) throws Exception {

        // Generar IV aleatorio
        byte[] iv = new byte[TAM_IV];
        SecureRandom random = new SecureRandom();
        random.nextBytes(iv);

        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec spec = new GCMParameterSpec(TAM_TAG, iv);
        cipher.init(Cipher.ENCRYPT_MODE, claveAES, spec);

        byte[] cifrado = cipher.doFinal(textoPlano.getBytes("UTF-8"));

        // Combinar IV + cifrado
        byte[] combinado = new byte[iv.length + cifrado.length];
        System.arraycopy(iv, 0, combinado, 0, iv.length);
        System.arraycopy(cifrado, 0, combinado, iv.length, cifrado.length);

        return Base64.getEncoder().encodeToString(combinado);
    }

    // ============================================================
    // 5. DESCIFRAR TEXTO CON AES-GCM
    // ============================================================
    public static String descifrar(String textoCifradoBase64, SecretKey claveAES) throws Exception {

        byte[] combinado = Base64.getDecoder().decode(textoCifradoBase64);

        byte[] iv = new byte[TAM_IV];
        byte[] cifrado = new byte[combinado.length - TAM_IV];

        System.arraycopy(combinado, 0, iv, 0, TAM_IV);
        System.arraycopy(combinado, TAM_IV, cifrado, 0, cifrado.length);

        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec spec = new GCMParameterSpec(TAM_TAG, iv);
        cipher.init(Cipher.DECRYPT_MODE, claveAES, spec);

        byte[] textoPlano = cipher.doFinal(cifrado);
        return new String(textoPlano, "UTF-8");
    }
    // ============================================================
    // 6. INICIALIZAR LA CLAVE UNA UNICA VEZ EN EL PROGRAMA
    // ============================================================
	public static void inicializarClaveAES() {
	    try {
	        SecretKey clave = SeguridadAES.generarClaveAES();
	        SeguridadAES.guardarClaveAES(clave);
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	}
    // ======================================================================
    // 7. CARGAR EL FICHERO DONDE ESTA LA CLAVE PARA USARLA UNA UNICA CVEZ
    // ======================================================================
	public static void CargarFicheroClave()
	{
		SecretKey clave=null;
		try {
			clave = SeguridadAES.generarClaveAES();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			SeguridadAES.guardarClaveAES(clave);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
