package conexionesJDBC;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusAdapter;
import java.awt.event.FocusEvent;
import java.awt.event.ItemEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Path;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.SwingConstants;

public class PanelPrincipal {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//CASO 1: MOSTRAR AL USUARIO INVITADO LA TABLA DE STOCK CALCULANDO COSTES TABULADOS SIN PEDIR
		//CRUDopciones selector= new CRUDopciones("INVITADO");  
		//CASO 2: MOSTRAR AL USUARIO REGISTRADO LA TABLA DE STOCK Y SUS PEDIDOS
			//CARGAR LOS PEDIDOS Y PODER MODIFICARLOS O ELIMINARLOS
		//selector.selectorCRUD();
		HalldeApp app= new HalldeApp();
  }
}

class HalldeApp extends JFrame
{
	public HalldeApp()
	{
        // Definimos las dimensiones del JFrame
        setBounds(300,100,350,400);
        setTitle("Bienvenido a Sfer4D Corporation - Building digital universes");
        setIconImage(new ImageIcon("ficherosUtilizados/icono.png").getImage());
        setResizable(false);
        PanelHalldeApp almacen = new PanelHalldeApp("ficherosUtilizados/hallApp.jpg", 30,this);
		add(almacen);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setVisible(true);
	}
}
class PanelHalldeApp extends JPanel implements ActionListener
{
	//1) DECLARACION DE ELEMENTOS USADOS EN LA INTERFAZ
	private BufferedImage imagen;
    private float alfaImagen = 1.0f; // opaco por defecto
    
	//2) DECLARACION DE JBUTTON, JLABELS Y EL JCOMBOBOX
	private JButton aceptar;    //BOTON DE ACEPTAR LA ELECCION IMPUESTA POR EL DESPLEGABLE
	private JComboBox<String> eleccionUsuario;    //EL USUARIO ELIGE EL TIPO DE PERSONA QUE ACCEDE A LA APP
	private JLabel tituloEleccion; //TITULO DEL DESPLEGABLE
    private String vector[]= {"INVITADO","CLIENTE","ADMINISTRACION","JEFES"};
    
    //3) DECLARACION DE JBUTTON, JLABELS Y EL JCOMBOBX QUE APARECERAN CON LA LLAMADA DEL EVENTLISTENER PARA: CLIENTES, ADMINISTRACION Y JEFES, TODOS DIFERENTES
	private JLabel tituloCliente, tituloAdministracion, tituloJefe;                     //TITULO DEL CLIENTE, ADMINISTRACION Y JEFES
	private JLabel nombreCliente, nombreAdministracion, nombreJefe;                       //TITULO DE LA ETIQUETA DE LA CAJA NOMBRE      
	private JLabel passwordCliente, passwordAdministracion, passwordJefe;                 //TITULO DE LA ETIQUETA DE LA CAJA CONTRASEÑA      
	private JTextField cajanNombre, cajaPassword;  //CAJA DEL CONTENIDO DEL NOMBRE DEL USUARIO
    
    //4) NECESITAMOS CERRAR ESTE MISMO JFRAME TRAS DARLE ACEPTAR LA ELECCION DEL TIPO DE USUARIO
    private JFrame tableroBase;
	
	public PanelHalldeApp(String ruta,int transparencia,JFrame tableroBase)
	{	
		//1) SE ASIGNA EL JFRAME DE LA BASE DEL ESTA APP
		this.tableroBase=tableroBase;
		
	    //2) TRATAMIENTO DE FONDO LAMINA /////////////////////
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
		
	    //4) DECLARACION DE BOTONES PARA PODER MOSTRAR AL USUARIO LAS POSIBLES ELECCIONES EXISTENTES
		this.tituloEleccion=new JLabel("ELEGIR TIPO DE USUARIO");    
		this.tituloEleccion.setBounds(30, 10, 240,20);   
		this.tituloEleccion.setHorizontalAlignment(SwingConstants.CENTER);   
		add(this.tituloEleccion);
		
		this.eleccionUsuario=new JComboBox<String>(this.vector);    
		this.eleccionUsuario.setBounds(30, 50, 240,20); 
		add(this.eleccionUsuario);
		this.eleccionUsuario.addItemListener(e -> {     //SE PRETENDE DETECTAR LA ELECCION DESDE EL JCOMBOBOX PARA MOSTRAR UN FORMULARIO DIFERENTE
		    if (e.getStateChange() == ItemEvent.SELECTED) {
		        Object valor = eleccionUsuario.getSelectedItem();
		        this.mostrarPanelConcreto(valor.toString());
		    }
		});

		this.aceptar=new JButton("ACEPTAR ELECCIÓN");    
		this.aceptar.setBounds(50, 90, 200,20);   
		this.aceptar.setHorizontalAlignment(SwingConstants.CENTER);   
		add(this.aceptar);
		this.aceptar.addActionListener(this);  //Se genera la llamada y se recoge lo seleccionado en el JCOMBOBOX
		
			//CLIENTE
	 		//DECLARACION DE LOS COMPONENTES DEL CLIENTE
	 		this.tituloCliente= new JLabel("BIENVENIDO/A INTRODUZCA SUS DATOS");
	 		this.tituloCliente.setBounds(30, 130, 240,20);
	 		add(this.tituloCliente);
	 		
	 		this.nombreCliente= new JLabel("NOMBRE CLIENTE");
	 		this.nombreCliente.setBounds(30, 170, 240, 20);
	 		add(this.nombreCliente);
	 		
	 		this.passwordCliente= new JLabel("CONTRASEÑA CLIENTE");
	 		this.passwordCliente.setBounds(30, 250, 240, 20);
	 		add(this.passwordCliente);
	 		
	 		this.cajanNombre= new JTextField("Indique nombre Cliente");
	 		this.cajanNombre.setBounds(30, 210, 240, 20);
	 		add(this.cajanNombre);
	 		
	 		this.cajaPassword= new JTextField("Indique contraseña Cliente");
	 		this.cajaPassword.setBounds(30, 290, 240, 20);
	 		add(this.cajaPassword);
	
	 		//ADMINISTRADOR
	 		//DECLARACION DE LOS COMPONENTES DEL ADMINISTRADOR
	 		this.tituloAdministracion= new JLabel("BIENVENIDO/A INTRODUZCA SUS DATOS");
	 		this.tituloAdministracion.setBounds(30, 130, 240,20);
	 		add(this.tituloAdministracion);
	 		
	 		this.nombreAdministracion= new JLabel("NOMBRE ADMINISTRADOR");
	 		this.nombreAdministracion.setBounds(30, 170, 240, 20);
	 		add(this.nombreAdministracion);
	 		
	 		this.passwordAdministracion= new JLabel("CONTRASEÑA ADMINISTRADOR");
	 		this.passwordAdministracion.setBounds(30, 250, 240, 20);
	 		add(this.passwordAdministracion);
	 		
	 		//JEFES
	 		//DECLARACION DE LOS COMPONENTES DE LOS JEFES
	 		this.tituloJefe= new JLabel("BIENVENIDO/A INTRODUZCA SUS DATOS");
	 		this.tituloJefe.setBounds(30, 130, 240,20);
	 		add(this.tituloJefe);
	 		
	 		this.nombreJefe= new JLabel("NOMBRE DEL JEFE/A");
	 		this.nombreJefe.setBounds(30, 170, 240, 20);
	 		add(this.nombreJefe);
	 		
	 		this.passwordJefe= new JLabel("CONTRASEÑA DEL JEFE/A");
	 		this.passwordJefe.setBounds(30, 250, 240, 20);
	 		add(this.passwordJefe);
	 		
		//ESTADO INICIAL DE EJECUCIÓN PARA EVITAR CONFICTOS DE INTERFERENCIAS VISUALES 
	 	//SE QUITA EL CLIENTE
 			this.tituloCliente.setVisible(false);
	 		this.nombreCliente.setVisible(false);
	 		this.passwordCliente.setVisible(false);
 		//SE PONE EL ADMINISTRADOR
	 		this.tituloAdministracion.setVisible(false);
	 		this.nombreAdministracion.setVisible(false);
	 		this.passwordAdministracion.setVisible(false);
	 	//SE QUITA EL JEFE/A
	 		this.tituloJefe.setVisible(false);
	 		this.nombreJefe.setVisible(false);
	 		this.passwordJefe.setVisible(false);
	 	//SE PONEN LAS CAJAS COMUNNES PARA TODOS INHABILITADOS
	 		this.cajanNombre.setVisible(false);
	 		this.cajaPassword.setVisible(false);
	}
	public void mostrarPanelConcreto(String valor)
	{
		 switch(valor)
		 {
		 case "INVITADO":  //ENTRADA A USUARIO INVITADO SIN REGISTRO
		 	{
		 		//SE DESACTIVAN TODOS PORQUE NO PRECISA DE INGRESO DE NINGUN TIPO
		 		//QUEDAN ACTIVOS TNINGUNO
		 		//QUEDAN DESACTIVADOS LOS DE INVITADO, CLIENTE, ADMINISTADOR Y JEFES
			 	//SE QUITA EL CLIENTE
		 			this.tituloCliente.setVisible(false);
			 		this.nombreCliente.setVisible(false);
			 		this.passwordCliente.setVisible(false);
		 		//SE PONE EL ADMINISTRADOR
			 		this.tituloAdministracion.setVisible(false);
			 		this.nombreAdministracion.setVisible(false);
			 		this.passwordAdministracion.setVisible(false);
			 	//SE QUITA EL JEFE/A
			 		this.tituloJefe.setVisible(false);
			 		this.nombreJefe.setVisible(false);
			 		this.passwordJefe.setVisible(false);
			 	//SE QUITAN LAS CAJAS DE LOS CAMPOS DE FORMUALRIO EN CASO DE APARECER LOGIN
			 		this.cajanNombre.setVisible(false);
			 		this.cajaPassword.setVisible(false);
		 		break;
		 	}     
		 case "CLIENTE":  //ENTRADA A USUARIO REGISTRADO
		 	{	
		 		//QUEDAN ACTIVOS TODOS LOS CAMPOS DEL CLIENTE
		 		//QUEDAN DESACTIVADOS LOS DE INVITADO, ADMINISTADOR Y JEFES
			 	//SE QUITA EL CLIENTE
		 			this.tituloCliente.setVisible(true);
			 		this.nombreCliente.setVisible(true);
			 		this.passwordCliente.setVisible(true);
		 		//SE PONE EL ADMINISTRADOR
			 		this.tituloAdministracion.setVisible(false);
			 		this.nombreAdministracion.setVisible(false);
			 		this.passwordAdministracion.setVisible(false);
			 	//SE QUITA EL JEFE/A
			 		this.tituloJefe.setVisible(false);
			 		this.nombreJefe.setVisible(false);
			 		this.passwordJefe.setVisible(false);
			 	//SE PONEN LAS CAJAS DEL FORMULARIO DEL CLIENTE Y SE ADAPTAN AL CLIENTE
			 		this.cajanNombre.setVisible(true);
			 		this.cajaPassword.setVisible(true);
			 		
		 		//SE CREA ESTADO INICIAL DE LA CAJA CLIENTE
		 		this.cajanNombre.setText("Nombre Cliente...");
		 		this.cajanNombre.setForeground(Color.GRAY);	
			 		//CREA EL EFECTO DE PLACEHOLDER SEGUN POSEA EL FOCO O LO PIERDA
			 		this.cajanNombre.addFocusListener(new FocusAdapter() {
			 		    @Override
			 		    public void focusGained(FocusEvent d) {
			 		        if (cajanNombre.getText().equals("Nombre Cliente...")) {
			 		        	cajanNombre.setText("");
			 		        	cajanNombre.setForeground(Color.BLACK);
			 		        }
			 		    }
			 		    @Override
			 		    public void focusLost(FocusEvent d) {
			 		        if (cajanNombre.getText().isEmpty()) {
			 		        	cajanNombre.setText("Nombre Cliente...");
			 		        	cajanNombre.setForeground(Color.GRAY);
			 		        }
			 		    }
			 		});
			 		
			 		// ESTADO INICIAL DE LA CAJA CONTRASEÑA
			 		this.cajaPassword.setText("Contraseña Cliente...");
			 		this.cajaPassword.setForeground(Color.GRAY);
			
			 		//CREA EL EFECTO DE PLACEHOLDER SEGUN POSEA EL FOCO O LO PIERDA
			 		this.cajaPassword.addFocusListener(new FocusAdapter() {
			 		    @Override
			 		    public void focusGained(FocusEvent e) {
			 		        if (cajaPassword.getText().equals("Contraseña Cliente...")) {
			 		        	cajaPassword.setText("");
			 		        	cajaPassword.setForeground(Color.BLACK);
			 		        }
			 		    }
			 		    @Override
			 		    public void focusLost(FocusEvent e) {
			 		        if (cajaPassword.getText().isEmpty()) {
			 		        	cajaPassword.setText("Contraseña Cliente...");
			 		        	cajaPassword.setForeground(Color.GRAY);
			 		        }
			 		    }
			 		});
		 		break;
		 	}       
		 case "ADMINISTRACION":  //ENTRADA A EMPRESA ADMINISTRATIVA
		 	{
		 		//QUEDAN ACTIVOS TODOS LOS CAMPOS DEL ADMINISTRADOR
		 		//QUEDAN DESACTIVADOS LOS DE INVITADO, CLIENTE Y JEFES
			 	//SE QUITA EL CLIENTE
		 			this.tituloCliente.setVisible(false);
			 		this.nombreCliente.setVisible(false);
			 		this.passwordCliente.setVisible(false);
		 		//SE PONE EL ADMINISTRADOR
			 		this.tituloAdministracion.setVisible(true);
			 		this.nombreAdministracion.setVisible(true);
			 		this.passwordAdministracion.setVisible(true);
			 	//SE QUITA EL JEFE/A
			 		this.tituloJefe.setVisible(false);
			 		this.nombreJefe.setVisible(false);
			 		this.passwordJefe.setVisible(false);
			 	//SE PONEN LAS CAJAS DEL FORMULARIO DEL ADMINISTRADOR Y SE ADAPTAN AL ADMINISTRADOR
			 		this.cajanNombre.setVisible(true);
			 		this.cajaPassword.setVisible(true);	
			 		//SE CREA ESTADO INICIAL DE LA CAJA CLIENTE
			 		this.cajanNombre.setText("Nombre Administrador...");
			 		this.cajanNombre.setForeground(Color.GRAY);	
				 		//CREA EL EFECTO DE PLACEHOLDER SEGUN POSEA EL FOCO O LO PIERDA
				 		this.cajanNombre.addFocusListener(new FocusAdapter() {
				 		    @Override
				 		    public void focusGained(FocusEvent d) {
				 		        if (cajanNombre.getText().equals("Nombre Administrador...")) {
				 		        	cajanNombre.setText("");
				 		        	cajanNombre.setForeground(Color.BLACK);
				 		        }
				 		    }
				 		    @Override
				 		    public void focusLost(FocusEvent d) {
				 		        if (cajanNombre.getText().isEmpty()) {
				 		        	cajanNombre.setText("Nombre Administrador...");
				 		        	cajanNombre.setForeground(Color.GRAY);
				 		        }
				 		    }
				 		});
				 		
				 		// ESTADO INICIAL DE LA CAJA CONTRASEÑA
				 		this.cajaPassword.setText("Contraseña Administrador...");
				 		this.cajaPassword.setForeground(Color.GRAY);
				
				 		//CREA EL EFECTO DE PLACEHOLDER SEGUN POSEA EL FOCO O LO PIERDA
				 		this.cajaPassword.addFocusListener(new FocusAdapter() {
				 		    @Override
				 		    public void focusGained(FocusEvent e) {
				 		        if (cajaPassword.getText().equals("Contraseña Administrador...")) {
				 		        	cajaPassword.setText("");
				 		        	cajaPassword.setForeground(Color.BLACK);
				 		        }
				 		    }
				 		    @Override
				 		    public void focusLost(FocusEvent e) {
				 		        if (cajaPassword.getText().isEmpty()) {
				 		        	cajaPassword.setText("Contraseña Administrador...");
				 		        	cajaPassword.setForeground(Color.GRAY);
				 		        }
				 		    }
				 		});
		 		break;
		 	}   
		 case "JEFES":    //ENTRADA A DIRECTIVOS
		 	{
		 		//QUEDAN ACTIVOS TODOS LOS CAMPOS DEL JEFE
		 		//QUEDAN DESACTIVADOS LOS DE INVITADO, ADMINISTADOR Y CLIENTES
			 	//SE QUITA EL CLIENTE
		 			this.tituloCliente.setVisible(false);
			 		this.nombreCliente.setVisible(false);
			 		this.passwordCliente.setVisible(false);
		 		//SE QUITA EL ADMINISTRADOR
			 		this.tituloAdministracion.setVisible(false);
			 		this.nombreAdministracion.setVisible(false);
			 		this.passwordAdministracion.setVisible(false);
			 	//SE PONE EL JEFE/A
			 		this.tituloJefe.setVisible(true);
			 		this.nombreJefe.setVisible(true);
			 		this.passwordJefe.setVisible(true);
				//SE PONEN LAS CAJAS DEL FORMULARIO DEL JEFE Y SE ADAPTAN AL JEFE
			 		this.cajanNombre.setVisible(true);
			 		this.cajaPassword.setVisible(true);	
			 		//SE CREA ESTADO INICIAL DE LA CAJA CLIENTE
			 		this.cajanNombre.setText("Nombre Jefe/a...");
			 		this.cajanNombre.setForeground(Color.GRAY);	
				 		//CREA EL EFECTO DE PLACEHOLDER SEGUN POSEA EL FOCO O LO PIERDA
				 		this.cajanNombre.addFocusListener(new FocusAdapter() {
				 		    @Override
				 		    public void focusGained(FocusEvent d) {
				 		        if (cajanNombre.getText().equals("Nombre Jefe/a...")) {
				 		        	cajanNombre.setText("");
				 		        	cajanNombre.setForeground(Color.BLACK);
				 		        }
				 		    }
				 		    @Override
				 		    public void focusLost(FocusEvent d) {
				 		        if (cajanNombre.getText().isEmpty()) {
				 		        	cajanNombre.setText("Nombre Jefe/a...");
				 		        	cajanNombre.setForeground(Color.GRAY);
				 		        }
				 		    }
				 		});
				 		
				 		// ESTADO INICIAL DE LA CAJA CONTRASEÑA
				 		this.cajaPassword.setText("Contraseña Jefe/a...");
				 		this.cajaPassword.setForeground(Color.GRAY);
				
				 		//CREA EL EFECTO DE PLACEHOLDER SEGUN POSEA EL FOCO O LO PIERDA
				 		this.cajaPassword.addFocusListener(new FocusAdapter() {
				 		    @Override
				 		    public void focusGained(FocusEvent e) {
				 		        if (cajaPassword.getText().equals("Contraseña Jefe/a...")) {
				 		        	cajaPassword.setText("");
				 		        	cajaPassword.setForeground(Color.BLACK);
				 		        }
				 		    }
				 		    @Override
				 		    public void focusLost(FocusEvent e) {
				 		        if (cajaPassword.getText().isEmpty()) {
				 		        	cajaPassword.setText("Contraseña Jefe/a...");
				 		        	cajaPassword.setForeground(Color.GRAY);
				 		        }
				 		    }
				 		});
			 	break;
		 	}     
		 default:break; //No hace nada al respecto
		 }
	}
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
		 Object elegido = this.eleccionUsuario.getSelectedItem().toString();   //Deteccion del JCOMBOBOX ELEGIDO
		 String parada = e.getActionCommand();   //Deteccion del boton de aceptar
		 ConsultasTipoUsuario cargarInterfaz;
		 String eleccion="";
		 
		 switch(elegido.toString())
		 {
			 case "INVITADO":{eleccion="INVITADO";break;}     //ENTRADA A USUARIO INVITADO SIN REGISTRO
			 case "CLIENTE":{eleccion="CLIENTE";break;}       //ENTRADA A USUARIO REGISTRADO
			 case "ADMINISTRACION":{eleccion="ADMINISTRACION";break;}   //ENTRADA A EMPRESA ADMINISTRATIVA
			 case "JEFES":{eleccion="JEFES";break;}     //ENTRADA A DIRECTIVOS
			 default:break; //No hace nada al respecto
		 }
		 if(parada.contains("ACEPTAR"))
		 {
		   this.tableroBase.dispose();  //Al darle a aceptar se cierra el panel completo
		   cargarInterfaz= new ConsultasTipoUsuario(eleccion);    //Asigna la eleccion del usuario
		 //Carga la interfaz del usuario: SI ES INVITADO ENVIARAN NULL EN OTRO CASO EL CONTENIDO DE AMBAS JTEXTFIELD
		   cargarInterfaz.selectorCRUD(this.cajanNombre.getText(),this.cajaPassword.getText());    
		 }
	}
}
