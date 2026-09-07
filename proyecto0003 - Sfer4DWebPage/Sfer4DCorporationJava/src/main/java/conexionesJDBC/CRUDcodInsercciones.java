package conexionesJDBC;

import java.awt.AlphaComposite;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.net.URL;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.SwingConstants;
import javax.swing.Timer;

import org.jdesktop.swingx.JXDatePicker;

public class CRUDcodInsercciones {

}

//AREA SE INSERCCIONES
class MarcoInsertar extends JFrame
{
	public MarcoInsertar()
	{
		setBounds(250,100,480,530);
		setTitle("AREA DE INSERCCIÓN COMPRAS");
		setIconImage(new ImageIcon("ficherosUtilizados/icono.png").getImage());  //CAMBIA EL ICONO DE LA APLICACION

		setResizable(false);
		PanelInsertar lamina1= new PanelInsertar("ficherosUtilizados/paisaje.jpg",30,this);
			//EL THIS DE LA INSTANCIACIÓN ANTERIOR ES PORQUE SE NECESITA EL MarcoInsertar CREADO
		add(lamina1);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setVisible(true);
	}
}
class PanelInsertar extends JPanel implements ActionListener
{
	private MarcoInsertar ventanaBase;
    private BufferedImage imagen;
    private float alfaImagen = 1.0f; // opaco por defecto
 
	//1) JLABELS DE LAS ENTRADAS DE DATOS
    			//EL NUMERO SE PONDRA COMO BOTON (DATOS DEL USUARIO)
	private JLabel nombre, telefono, direccion, correo;  

				//DATOS DEL PRODUCTO O SERVICIO PEDIDO (DATOS DEL PEDIDO)
	private JLabel concepto, departamento, cantidad, costeUnitario, costeTotal, fechaPedido, referencia, entregado;    
	
	//2) JTEXTAREAS DE LAS ENTRADAS DE DATOS
				//DATOS DEL USUARIO
	private JTextArea cajaNombre, cajaTelefono, cajaDireccion, cajaCorreo;
	
				//DATOS DEL PRODUCTO O SERVICIO PEDIDO: 
					//Hay unos departamentos fijos en la empresa
					//Cantidad: Definira la cantidad que aun hay en stock
					//Coste unitario: Debera ser leido de la otra tabla de la base de datos
	private JComboBox<String> cajaPrefijoTelefono, cajaDepartamento, cajaCantidad;     //Se considerara el prefijo del pais
	private JTextArea cajaConcepto, cajaCosteUnitario, cajaCostetotal, cajaReferencia, cajaEntregado;    
						//private JTextArea cajaEntregado;    //No se pone porque es area de inserccion
		
	//3) DECLARACION DE BOTONES Y ACCIONAMIENTOS
	private JButton aceptar, cancelar, cargar;
		
	//4) DECLARACION DEL ACCIONAMIENTO FECHA
	private JXDatePicker datePicker = new JXDatePicker();
    private Date calendario;

	public PanelInsertar(String ruta, int transparencia, MarcoInsertar ventanaBase)
	{
        this.ventanaBase = ventanaBase;   //Se recoge el objeto creado del JFrame para poder moverla al final en el boton mostrar STOCK
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
	//5) ESTETICA DE CAJAS-TITULOS-DESPLEGABLES-FECHAS
		setLayout(null);  //Para que respeten el setBounds
			
	//6) ASIGNACION DE JLABELS A LAS ENTRADAS DE DATOS
				
		setLayout(null);  //Para que respeten el setBounds
		this.nombre= new JLabel("NOMBRE");   			  this.nombre.setBounds(30,30,150,20);         add(this.nombre);              
		this.telefono= new JLabel("NÚMERO TELEFONO");     this.telefono.setBounds(30, 60,150,20);      add(this.telefono);
		this.direccion= new JLabel("DIRECCION");          this.direccion.setBounds(30,90,150,20);      add(this.direccion);
		this.correo= new JLabel("CORREO ELECTRÓNICO");    this.correo.setBounds(30,120,150,20);        add(this.correo);
	
		this.concepto=new JLabel("CONCEPTO");             this.concepto.setBounds(30,180,150,20);      add(this.concepto);
		this.departamento= new JLabel("DEPARTAMENTO");    this.departamento.setBounds(30,210,150,20);  add(this.departamento);
		this.cantidad= new JLabel("CANTIDAD");            this.cantidad.setBounds(30,240,150,20);      add(this.cantidad);
		this.costeUnitario= new JLabel("COSTE UNITARIO"); this.costeUnitario.setBounds(30,270,150,20); add(this.costeUnitario);
		this.costeTotal= new JLabel("COSTE TOTAL");       this.costeTotal.setBounds(30,300,150,20);    add(this.costeTotal);
		this.fechaPedido= new JLabel("FECHA PEDIDO");     this.fechaPedido.setBounds(30,330,150,20);   add(this.fechaPedido);
		this.referencia= new JLabel("REFERENCIA");        this.referencia.setBounds(30,360,150,20);    add(this.referencia);
		this.entregado= new JLabel("ENTREGADO");          this.entregado.setBounds(30,390,150,20);     add(this.entregado); 
		
	//7) ASIGNACION JTEXTAREAS Y JCOMBOBOX A LAS ENTRADAS DE DATOS
		
		//TEXTAREA y JCOMBOBOX (Y DATEPIKER PARA FECHA UNA UNICA INSERCCION)
		this.cajaNombre=new JTextArea();        this.cajaNombre.setBounds(210,30,210,20);      add(this.cajaNombre);
		this.cajaTelefono=new JTextArea();	    this.cajaTelefono.setBounds(280,60,140,20);    add(this.cajaTelefono);
		this.cajaDireccion=new JTextArea();	    this.cajaDireccion.setBounds(210,90,210,20);   add(this.cajaDireccion);
		this.cajaCorreo=new JTextArea();        this.cajaCorreo.setBounds(210,120,210,20);     add(this.cajaCorreo);
		
		this.cajaConcepto=new JTextArea();               this.cajaConcepto.setBounds(210,180,210,20);       add(this.cajaConcepto);
		this.cajaDepartamento= new JComboBox<String>();  this.cajaDepartamento.setBounds(210,210,210,20);   add(this.cajaDepartamento);
		this.cajaCantidad= new JComboBox<String>();      this.cajaCantidad.setBounds(210,240,210,20);     	add(this.cajaCantidad);
		this.cajaCosteUnitario=new JTextArea();          this.cajaCosteUnitario.setBounds(210,270,210,20);  add(this.cajaCosteUnitario);		
		this.cajaCostetotal=new JTextArea();          	 this.cajaCostetotal.setBounds(210,300,210,20);     add(this.cajaCostetotal);		

		this.cajaPrefijoTelefono= new JComboBox<String>();  this.cajaPrefijoTelefono.setBounds(210,60,65,21);  add(this.cajaPrefijoTelefono);
		this.datePicker= new JXDatePicker();      			this.datePicker.setBounds(210,330,210,20);         add(this.datePicker);         
		this.cajaReferencia= new JTextArea();               this.cajaReferencia.setBounds(210,360,210,20);     add(this.cajaReferencia); 
		this.cajaEntregado= new JTextArea();				this.cajaEntregado.setBounds(210,390,210,20);      add(this.cajaEntregado);
		
		//DECLARACION DE BOTONES Y ACCIONAMIENTOS
		this.aceptar= new JButton("ACEPTAR");         this.aceptar.setBounds(30,440,100,25);     add(this.aceptar);
		this.cancelar= new JButton("SALIR");	      this.cancelar.setBounds(150,440,100,25);   add(this.cancelar);
		this.cargar= new JButton("CARGAR STOCK");	  this.cargar.setBounds(270,440,150,25);     add(this.cargar);
			
		//ESTETICA DE BOTON DE FECHA SWING
		this.datePicker.setFormats("dd/MM/yyyy");
		datePicker.addActionListener(e -> {
		    this.calendario = this.datePicker.getDate();  //Si no se ha elegido fecha se pone Hoy
		});
	
		//REACCIONES DEL BOTON ACEPTAR Y CANCELAR OPERACIONES
			this.cancelar.addActionListener(this);
			this.aceptar.addActionListener(this);
			this.cargar.addActionListener(this);
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
        Object src = e.getSource();

        if (src == aceptar) {
			try {
				//SE ADICIONA EL PETICIONADOR AL USUARIO
				String producto= JOptionPane.showInputDialog("INTRODUZCA EL ARTÍCULO QUE QUIERE ALMACENAR");
				
				//1 - CREAR CONEXION
				//En el caso de MYSQL
				Connection conector= DriverManager.getConnection("jdbc:mysql://localhost:3306/pruebasdef","root","1234");
				
				//2 - CREAR EL STATENMENT
				Statement myst = conector.createStatement();
				
				//3 - CREAR INSTRUCCIÓN SQL
				String inSQL="INSERT INTO productos(CODIGOARTICULO,NOMBREARTICULO,PRECIO) VALUES ('AR45','"+producto+"',50)";

				//4 - EJECUTAR SQL
				myst.executeUpdate(inSQL);
				
				//5 - CERRAR LA CONEXION
				conector.close(); 
				
				JOptionPane.showMessageDialog(null, "INFORMACIÓN ACTUALIZADA");
			} catch (SQLException error) {
				// TODO Auto-generated catch block
				error.printStackTrace();
			}  
        }

        if (src == cancelar) {
            JOptionPane.showMessageDialog(null, "Ha decidido salir, Hasta luego");
            System.exit(0);
        }
        if (src == cargar) {
			this.cargar.setEnabled(false);    //Se deshabilita el botón para evitar crear más instancias del segundo JFrame
			CRUDcodConsultas nuevo= new CRUDcodConsultas();
			//ENVIA EL MAPA DE DATOS
        	//Procedemos a mover la ventana hacia la izquierda para mostrar otro panel: el de STOCK disponible
        	MarcoInsertarStock panelStock= new MarcoInsertarStock(true,this.cargar,nuevo.getMapaDatosStock());
        }
    }
}

////////// AREA DE PANEL DE STOCK //////////

class MarcoInsertarStock extends JFrame
{
    private Point PanelAlmacenajeSalida;
    private JButton botonPrincipal, cerrar;
    private int dimensionVerticalScroll=0,numProductos=0,numServicios=0,numProyectos=0;

    public MarcoInsertarStock(Boolean semaforo, JButton cargar, HashMap<Integer, ObjetoVenta> mapeo)
    {
        //1) Si el panel previo crece dinámicamente, ajustamos las dimensiones verticales del SCROLL
    	this.numProductos=ObjetoVenta.getNumProductos();
    	this.numServicios=ObjetoVenta.getNumServicios();
    	this.numProyectos=ObjetoVenta.getNumProyectos();
        this.dimensionVerticalScroll=ObjetoVenta.mayorDeTresRegistros(this.numProductos, this.numServicios, this.numProyectos);
        
        //2) Definimos las dimensiones del JFrame
        setBounds(300,100,680,530);
        setTitle("PANEL DE STOCK");
        setIconImage(new ImageIcon("ficherosUtilizados/icono.png").getImage());
        setResizable(false);
        setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
        setLayout(null);

        this.botonPrincipal = cargar;

        //3) El panel original
        PanelInsertarStock almacen = new PanelInsertarStock("ficherosUtilizados/almacen.jpg", 30, mapeo);

        //4) IMPORTANTE: tamaño mayor para que aparezca scroll
        almacen.setPreferredSize(new Dimension(680,60+75*this.dimensionVerticalScroll)); 

        //5) ScrollPane que contiene tu panel
        JScrollPane scroll = new JScrollPane(almacen);
        scroll.setBounds(0, 0, 680, 530);

        //6) Opcional: siempre mostrar scroll vertical
        scroll.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);

        add(scroll);

        //7) Botón VOLVER (debe estar dentro del panel si quieres que se desplace)
        cerrar = new JButton("VOLVER");
        cerrar.setBounds(30,74*this.dimensionVerticalScroll, 100, 25);
        cerrar.addActionListener(e -> {
            this.botonPrincipal.setEnabled(true);
            this.dispose();
        });

        //8) Si quieres que el botón se mueva con el scroll:
        almacen.add(cerrar);

        //9) Si quieres que el botón NO se mueva con el scroll:
        setVisible(semaforo);
    }
}

class PanelInsertarStock extends JPanel implements ActionListener
{
    private BufferedImage imagen;
    private float alfaImagen = 1.0f; // opaco por defecto
    private int punteroProdu=0, punteroServ=0, punteroProy=0;   //Puntero de relleno
    private JLabel productos,servicios,proyectos;
    
	public PanelInsertarStock(String ruta,int transparencia,HashMap<Integer, ObjetoVenta> mapaStock)
	{
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
	//1) ESTETICA DE CAJAS-TITULOS-DESPLEGABLES-FECHAS
		setLayout(null);  //Para que respeten el setBounds
		
	//2) DECLARACION DE BOTONES PARA PODER MOSTRAR AL USUARIO LAS POSIBLES ELECCIONES EXISTENTES
		this.productos=new JLabel("PRODUCTOS");    this.productos.setBounds(30, 10, 180,20);   this.productos.setHorizontalAlignment(SwingConstants.CENTER);   add(this.productos);   
		this.servicios=new JLabel("SERVICIOS");    this.servicios.setBounds(230, 10, 180,20);  this.servicios.setHorizontalAlignment(SwingConstants.CENTER);   add(this.servicios);
		this.proyectos=new JLabel("PROYECTOS");    this.proyectos.setBounds(430, 10, 180,20);  this.proyectos.setHorizontalAlignment(SwingConstants.CENTER);   add(this.proyectos);
		
		mapaStock.forEach((clave,valor)->
		{
			if("PRODUCTOS".equals(valor.getDestino().trim()) || "SERVICIOS".equals(valor.getDestino().trim()) || "PROYECTOS".equals(valor.getDestino().trim()))
			{	//SOLO SE MOSTRARAN LOS PRODUCTOS, SERVICIOS O PROYECTOS el resto es de la interfaz Angular de la pagina web				
				JButton botones= new JButton("<html>"+(this.punteroProdu+1)+") "+valor.getNombre().substring(0, valor.getNombre().length() - 4)+"<br>"+valor.getSector()+"</html>");
				botones.setBounds(30,30+40*this.punteroProdu,180,30);  
				botones.setFont(new Font("Arial", Font.PLAIN, 10));      //tamanio fuente
				botones.setHorizontalAlignment(SwingConstants.LEFT);     //alineacion fuente
				add(botones);
				botones.addActionListener(this);
				this.punteroProdu++;
			}
			if("SERVICIOS".equals(valor.getDestino().trim()))
			{	//SOLO SE MOSTRARAN LOS PRODUCTOS, SERVICIOS O PROYECTOS el resto es de la interfaz Angular de la pagina web				
				JButton botones= new JButton("<html>"+(this.punteroServ+1)+") "+valor.getNombre().substring(0, valor.getNombre().length() - 4)+"<br>"+valor.getSector()+"</html>");
				botones.setBounds(230,30+40*this.punteroServ,180,30);
				botones.setFont(new Font("Arial", Font.PLAIN, 10));
				botones.setHorizontalAlignment(SwingConstants.LEFT);
				add(botones);
				botones.addActionListener(this);
				this.punteroServ++;
			}
			if("PROYECTOS".equals(valor.getDestino().trim()))
			{	//SOLO SE MOSTRARAN LOS PRODUCTOS, SERVICIOS O PROYECTOS el resto es de la interfaz Angular de la pagina web				
				JButton botones= new JButton("<html>"+(this.punteroProy+1)+") "+valor.getNombre().substring(0, valor.getNombre().length() - 4)+"<br>"+valor.getSector()+"</html>");
				botones.setBounds(430,30+40*this.punteroProy,180,30);
				botones.setFont(new Font("Arial", Font.PLAIN, 10));
				botones.setHorizontalAlignment(SwingConstants.LEFT);
				add(botones);
				botones.addActionListener(this);
				this.punteroProy++;
			}
		});
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
		Object o=e;
		System.out.println(e.getSource().toString());
	}
	
}
