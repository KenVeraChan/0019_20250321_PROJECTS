package conexionesJDBC;                //// ZONA: ADMINISTRACION  ////

import java.awt.AlphaComposite;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Path;
import java.util.Date;

import javax.imageio.ImageIO;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JPanel;

import org.jdesktop.swingx.JXDatePicker;

public class PanelAdministracion {

}

class AdministradorDatos
{
	private int id;          	  //ID administrador
	private String usuario;  	  //Nombre usuari. NO SE RECOGE SU CONTRASENIA
	private String rol;			  //Rol del usuario: Administrador o Jefe
	private String departamento;  //Departamento al que pertenece
	
	public AdministradorDatos(int id, String usuario, String rol, String departamento) 
	{
		//SE RECOGE LA INFORMACIÓN DEL USUARIO DE ADMINISTRACION
		this.id = id;
		this.usuario = usuario;
		this.rol = rol;
		this.departamento = departamento;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public String getRol() {
		return rol;
	}
	public void setRol(String rol) {
		this.rol = rol;
	}
	public String getDepartamento() {
		return departamento;
	}
	public void setDepartamento(String departamento) {
		this.departamento = departamento;
	}
}

class PanelModificar extends JPanel implements ActionListener
{
	//1) VARIABLES DE ENTRADA
    private BufferedImage imagen;
    private float alfaImagen = 1.0f; // opaco por defecto
    
    //2) DECLARACION DE ACTIVADOR DE SI ES INVITADO A CLIENTE MODIFICANDO LO QUE MUESTRAEL PANEL DE STOCK
    private AdministradorDatos clienteLogin;

    //3)  
    
	public PanelModificar(String ruta, int transparencia, AdministradorDatos clienteLogin)
	{
		//PANEL DEL ADMINISTRADOR
		//1) RECOGIENDO LA INFORMACION DEL CLIENTE LOGEADO COMO CLIENTE QUE PODRA O NO COMPRAR
		this.clienteLogin=clienteLogin;
		
		/////// TRATAMIENTO DE FONDO LAMINA /////////////////////
		    try {
		        if (ruta.startsWith("http")) {
		            // URL remota
		        	Path path = Path.of(ruta);
		        	this.imagen = ImageIO.read(path.toFile());
		        }
		        else if (ruta.startsWith("file:/")) {
		            // URL local absoluta
		        	Path path = Path.of(ruta);
		        	this.imagen = ImageIO.read(path.toFile());
		        }
		        else {
		           // Ruta local normal (MI CASO)
		            File archivo = new File(ruta);
		            this.imagen = ImageIO.read(archivo);
		        }
		        // transparencia de 0 a 100 → alpha de 0.0 a 1.0
		        this.alfaImagen = Math.max(0, Math.min(100, transparencia)) / 100f;
		    } catch (Exception e) {
		        e.printStackTrace();
		    }	
		//3) ESTETICA DE CAJAS-TITULOS-DESPLEGABLES-FECHAS
			setLayout(null);  //Para que respeten el setBounds
	}
	
	
	

	
	
	
	
	
	//	1.1. Gestión de Ventas y Pedidos
	//  - Procesamiento de Pedidos: Recepción, preparación, cambio de estados
    //		(Pendiente, En Preparación, Enviado, Entregado) y cancelaciones.
  	//	- Facturación y Cobros: Emisión de facturas electrónicas, albaranes,
    //		registro de pagos manuales/transferencias y tramitación de devoluciones.
  	//  - Atención al Cliente: Gestión de tickets de soporte, resolución de
    //		incidencias con envíos y asignación de cupones de descuento directos.

 
 
	//	1.2. Gestión Avanzada de Stock e Inventario
  	//	- Catálogo de Productos: Alta, baja y modificación de productos, precios,
    //	  	categorías e imágenes.
  	//	- Recepción de Mercancía: Registro de entrada de stock proveniente de
    //		proveedores y ajuste de mermas (productos dañados o extraviados).
  	//	- Configuración de Alertas: Establecimiento de umbrales mínimos de stock
    //		para notificar la necesidad de reposición.

	//	1.3. Gestión de Clientes
  	//	- Administración de Clientes: Edición de datos de contacto, consulta del
    //		historial de compras y estado de la cuenta del cliente.
  	//	- Seguimiento de Invitados: Visualización del interés manifestado por
    //		usuarios invitados para posibles acciones de captación.

	
	
	
	
	
	
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        if (this.imagen != null) {
            Graphics2D g2 = (Graphics2D) g.create();
            g2.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, this.alfaImagen));
            g2.drawImage(imagen, 0, 0, getWidth(), getHeight(), this);
            g2.dispose();
        }
    }
	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		
	}
}