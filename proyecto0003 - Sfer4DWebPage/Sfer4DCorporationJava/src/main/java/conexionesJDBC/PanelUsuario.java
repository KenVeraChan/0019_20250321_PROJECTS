package conexionesJDBC;

import java.awt.AlphaComposite;
import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.swing.DefaultComboBoxModel;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.SwingConstants;

import org.jdesktop.swingx.JXDatePicker;

public class PanelUsuario {

}

//AREA SE INSERCCIONES
class MarcoBaseOp extends JFrame
{
	public MarcoBaseOp(Boolean habilitadorCliente)
	{	
		//1) ZONA DE CREAR VARIABLE INERTE
		ClienteRegistrado clienteLoginSinNada=null;
		
		//2) ZONA DE MOSTRAR AL USUARIO INVITADO QUE DEBE VER
		setBounds(250,100,400,200);    //No se necesitara que ocupe tanto en vertical
		setTitle("AREA DE USUARIO INVITADO");
		setIconImage(new ImageIcon("ficherosUtilizados/icono.png").getImage());  //CAMBIA EL ICONO DE LA APLICACION

		setResizable(false);
		PanelInsertar lamina1= new PanelInsertar("ficherosUtilizados/paisaje.jpg",30,this,false,habilitadorCliente,clienteLoginSinNada);  //No se muestra formulario
			//EL THIS DE LA INSTANCIACIÓN ANTERIOR ES PORQUE SE NECESITA EL MarcoInsertar CREADO
		add(lamina1);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setVisible(true);
	}
	public MarcoBaseOp(ClienteRegistrado clienteLogin,Boolean habilitadorCliente)
	{	//ZONA DE INSERCCIONES USUARIO CLIENTE, ADMINISTRADOR O JEFE
		setBounds(250,100,480,530);
		setTitle("AREA DE INSERCCIÓN COMPRAS");
		setIconImage(new ImageIcon("ficherosUtilizados/icono.png").getImage());  //CAMBIA EL ICONO DE LA APLICACION

		setResizable(false);
		PanelInsertar lamina1= new PanelInsertar("ficherosUtilizados/paisaje.jpg",30,this,true,habilitadorCliente,clienteLogin);  //Si se muestra formulario
			//EL THIS DE LA INSTANCIACIÓN ANTERIOR ES PORQUE SE NECESITA EL MarcoInsertar CREADO
		add(lamina1);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setVisible(true);
	}
}
class PanelInsertar extends JPanel implements ActionListener
{
	private MarcoBaseOp ventanaBase;
    private BufferedImage imagen;
    private float alfaImagen = 1.0f; // opaco por defecto
 
	//1) JLABELS DE LAS ENTRADAS DE DATOS
    		//EL NUMERO SE PONDRA COMO BOTON (DATOS DEL USUARIO)
	private JLabel nombre, telefono, direccion, correo, tituloInvitado;  

			//DATOS DEL PRODUCTO O SERVICIO PEDIDO (DATOS DEL PEDIDO)
	private JLabel concepto, departamento, cantidad, costeUnitario, costeTotal, fechaPedido, referencia, entregado;    
	
	//2) JTEXTAREAS DE LAS ENTRADAS DE DATOS
			//DATOS DEL USUARIO
	private JLabel cajaNombre, cajaTelefono, cajaDireccion, cajaCorreo;
	
				//DATOS DEL PRODUCTO O SERVICIO PEDIDO: 
					//Hay unos departamentos fijos en la empresa
					//Cantidad: Definira la cantidad que aun hay en stock
					//Coste unitario: Debera ser leido de la otra tabla de la base de datos
	private JLabel cajaDepartamento, cajaCantidad;     //Se considerara el prefijo del pais
	private JLabel cajaConcepto, cajaCosteUnitario, cajaCostetotal, cajaReferencia, cajaEntregado;    
						//private JTextArea cajaEntregado;    //No se pone porque es area de inserccion
		
	//3) DECLARACION DE BOTONES Y ACCIONAMIENTOS
	private JButton aceptar, cancelar, cargar;
		
	//4) DECLARACION DEL ACCIONAMIENTO FECHA
	private JXDatePicker datePicker = new JXDatePicker();
    private Date calendario;
    
    //5) DECLARACION DE ACTIVADOR DE SI ES INVITADO A CLIENTE MODIFICANDO LO QUE MUESTRAEL PANEL DE STOCK
    private boolean activadorCompras=false;
    private ClienteRegistrado clienteLogin;
    
    //6) DECLARACION DE DESPLEGABLES DEL HISTORIAL DE COMPRAS DEL CLIENTE
    private JLabel historialCompras;
    private JComboBox<String> referenciaCompras = new JComboBox<String>();
    private JComboBox<Integer> listaArticulos = new JComboBox<Integer>();
    private static boolean historialComprasActivador=false;
    private boolean cargando = false;   //BOOLEANO DE DESACTIVACION DE LISTENER DEL JCOMBOBOX DURANTE EL LLENADO
    private boolean cargandoLista=false;
    private boolean listenersHistorialRegistrados=false;
    	
	//7) CREACION DE ESTRUCTURAS NECESARIAS
	private Map<String, List<PedidosClientes>> comprasPorReferencia = new LinkedHashMap<>();
    
	public PanelInsertar(String ruta, int transparencia, MarcoBaseOp ventanaBase,Boolean MostrarFormulario, Boolean habilitadorCliente,ClienteRegistrado clienteLogin)
	{
		//1) RECOGIENDO LA INFORMACION DEL CLIENTE LOGEADO COMO CLIENTE QUE PODRA O NO COMPRAR
			this.clienteLogin=clienteLogin;
		
		//2) RECOGIENDO EL OBJETO BASE DEL JFRAME HEREDADO
			this.ventanaBase = ventanaBase;   			//Se recoge el objeto creado del JFrame para poder moverla al final en el boton mostrar STOCK
			this.activadorCompras=habilitadorCliente;   //Se recoge la variable de activador para adaptarlo a un INVITADO o a un CLIENTE
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
		
        if(MostrarFormulario) //SI ES UN USUARIO CLIENTE DEBE MOSTRARSELE EL FORMULARIO COMPLETO ADEMAS DE VER STOCK
        {
			//6) ASIGNACION DE JLABELS A LAS ENTRADAS DE DATOS
						
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
				
				//TEXTAREA y JCOMBOBOX
				this.cajaNombre=new JLabel(getEstilos(clienteLogin.getUsuario()));      				  this.cajaNombre.setBounds(210,30,210,20);      add(this.cajaNombre);
				this.cajaTelefono=new JLabel(getEstilos(Long.toString(clienteLogin.getTelefono())));	  this.cajaTelefono.setBounds(210,60,210,20);    add(this.cajaTelefono);
				this.cajaDireccion=new JLabel(getEstilos(clienteLogin.getDireccion()));	              this.cajaDireccion.setBounds(210,90,210,20);   add(this.cajaDireccion);
				this.cajaCorreo=new JLabel(getEstilos(clienteLogin.getCorreo()));                      this.cajaCorreo.setBounds(210,120,210,20);     add(this.cajaCorreo);
				
				this.cajaConcepto=new JLabel(getEstilos(""));       this.cajaConcepto.setBounds(210,180,210,20);       add(this.cajaConcepto);
				this.cajaDepartamento= new JLabel(getEstilos(""));  this.cajaDepartamento.setBounds(210,210,210,20);   add(this.cajaDepartamento);
				this.cajaCantidad= new JLabel(getEstilos(""));      this.cajaCantidad.setBounds(210,240,210,20);     	add(this.cajaCantidad);
				this.cajaCosteUnitario=new JLabel(getEstilos(""));  this.cajaCosteUnitario.setBounds(210,270,210,20);  add(this.cajaCosteUnitario);		
				this.cajaCostetotal=new JLabel(getEstilos(""));     this.cajaCostetotal.setBounds(210,300,210,20);     add(this.cajaCostetotal);		
		
				this.datePicker= new JXDatePicker();     		  this.datePicker.setBounds(210,330,210,20);         add(this.datePicker);         
				this.cajaReferencia= new JLabel(getEstilos(""));    this.cajaReferencia.setBounds(210,360,210,20);     add(this.cajaReferencia); 
				this.cajaEntregado= new JLabel(getEstilos(""));	  this.cajaEntregado.setBounds(210,390,210,20);      add(this.cajaEntregado);
				
				//DECLARACION DE BOTONES Y ACCIONAMIENTOS
				this.aceptar= new JButton("VER COMPRAS");  this.aceptar.setBounds(30,440,120,25);     add(this.aceptar);
				this.cancelar= new JButton("SALIR");	   this.cancelar.setBounds(170,440,100,25);   add(this.cancelar);
				this.cargar= new JButton("CARGAR STOCK");  this.cargar.setBounds(290,440,130,25);     add(this.cargar);
					
				//ESTETICA DE BOTON DE FECHA SWING
				this.datePicker.setFormats("dd/MM/yyyy");
				datePicker.addActionListener(e -> {
				    this.calendario = this.datePicker.getDate();  //Si no se ha elegido fecha se pone Hoy
				});
			
				//REACCIONES DEL BOTON ACEPTAR Y CANCELAR OPERACIONES
					this.cancelar.addActionListener(this);
					this.aceptar.addActionListener(this);
					this.cargar.addActionListener(this);

			//8) SE AÑADE EL DESPLEGABLE DEL HISTORIAL DE COMPRAS: UNO PARA LA REFERENCIA DE COMPRA Y OTRO PARA EL NUMERO DE COMPRAS PARA MOSTRAR
				this.historialCompras= new JLabel("COMPRAS:");    this.historialCompras.setBounds(30,150,100,20);     add(this.historialCompras);
				this.referenciaCompras.setBounds(209,150,140,20);   add(this.referenciaCompras);
				this.listaArticulos.setBounds(359,150,60,20);      add(this.listaArticulos);
				this.registrarListenersHistorial();
				this.cargarHistorialCompras();
        }
        else    //SI SOLO ES UN USUARIO INVITADO NO PUEDE MOSTRARSELE EL FORMULARIO COMPLETO SOLO VER STOCK
        {
        	//DECLARACION DEL TITULO DE BIENVENIDA AL USUARIO INVITADO
        	this.tituloInvitado = new JLabel(      //SE EMPLEA HTML PARA PODER PROCESAR EL DECORADO CSS DEL INTERIOR
        		    "<html><span style='text-shadow: 3px 3px 4px white; font-size:9px;'>BIENVENIDO USUARIO INVITADO - VEA NUESTRO STOCK</span></html>");
    		this.tituloInvitado.setBounds(30, 30, 340,30);   
    		this.tituloInvitado.setHorizontalAlignment(SwingConstants.LEFT);   
    		add(this.tituloInvitado);
    		
			//DECLARACION DE BOTONES Y ACCIONAMIENTOS
			this.cancelar= new JButton("SALIR");	      this.cancelar.setBounds(50,90,100,25);   add(this.cancelar);
			this.cargar= new JButton("CARGAR STOCK");	  this.cargar.setBounds(170,90,150,25);     add(this.cargar);
				
    		//REACCIONES DEL BOTON ACEPTAR Y CANCELAR OPERACIONES
			this.cancelar.addActionListener(this);
			this.cargar.addActionListener(this);
        }
	}
	public String getEstilos(String datoAExponer)
	{
		String textoFiltrado=escaparHTML(datoAExponer);
		//Aqui se pondrán los estilos de cada uno de los apartados informativos
		String contenidoHTML =
			    "<html>"
			    + "<div style='"
			    + "background-color:#f7f7f7;"
			    + "border:1px solid #d0d0d0;"
			    + "padding:10px;"
			    + "font-family:Arial;"
			    + "font-size:9px;"
			    + "color:#001a33;"
			    + "width:250px;'>"
			    + "<span style='line-height:1.4;'>"
			    + textoFiltrado
			    + "</span>"
			    + "</div>"
			    + "</html>";
		return contenidoHTML;
	}
	public static String escaparHTML(String texto) //filtra el texto antes de proceder con la exposicion del mismo
	{
	    if (texto == null) return "";
	    return texto
	        .replace("&", "&amp;")
	        .replace("<", "&lt;")
	        .replace(">", "&gt;")
	        .replace("\"", "&quot;");
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
	private void registrarListenersHistorial()
	{
		if (this.listenersHistorialRegistrados || this.referenciaCompras == null || this.listaArticulos == null) {
			return;
		}
		this.listenersHistorialRegistrados = true;

		this.referenciaCompras.addItemListener(evento -> {
			if (this.cargando || evento.getStateChange() != ItemEvent.SELECTED) {
				return;
			}
			Object seleccionado = this.referenciaCompras.getSelectedItem();
			this.rellenarListaArticulos(seleccionado == null ? null : seleccionado.toString());
		});

		this.listaArticulos.addItemListener(evento -> {
			if (this.cargandoLista || evento.getStateChange() != ItemEvent.SELECTED) {
				return;
			}
			this.mostrarCompraSeleccionada();
		});
	}

	private void cargarHistorialCompras()
	{
		if (this.referenciaCompras == null || this.listaArticulos == null || this.clienteLogin == null) {
			return;
		}

		HashMap<Integer, PedidosClientes> pedidosClientes = PedidosClientes.getPedidosClientes();
		this.comprasPorReferencia.clear();

		pedidosClientes.forEach((clave, valor) -> {
			if (valor == null || valor.getNombre() == null || valor.getReferencia() == null) {
				return;
			}
			if (!this.clienteLogin.getUsuario().equals(valor.getNombre())) {
				return;
			}
			String ref = valor.getReferencia();
			this.comprasPorReferencia.computeIfAbsent(ref, k -> new ArrayList<>()).add(valor);
		});

		this.cargando = true;
		DefaultComboBoxModel<String> modeloReferencias = new DefaultComboBoxModel<String>();
		for (String ref : this.comprasPorReferencia.keySet()) {
			modeloReferencias.addElement(ref);
		}
		this.referenciaCompras.setModel(modeloReferencias);
		this.cargando = false;

		Object seleccion = this.referenciaCompras.getSelectedItem();
		this.rellenarListaArticulos(seleccion == null ? null : seleccion.toString());
	}

	private void rellenarListaArticulos(String refSeleccionada)
	{
		if (this.listaArticulos == null) {
			return;
		}
		List<PedidosClientes> lista = (refSeleccionada == null) ? null : this.comprasPorReferencia.get(refSeleccionada);
		int cantidad = (lista == null) ? 0 : lista.size();

		this.cargandoLista = true;
		DefaultComboBoxModel<Integer> modeloNumeros = new DefaultComboBoxModel<Integer>();
		for (int i = 1; i <= cantidad; i++) {
			modeloNumeros.addElement(i);
		}
		this.listaArticulos.setModel(modeloNumeros);
		this.cargandoLista = false;
		this.mostrarCompraSeleccionada();
	}

	private void mostrarCompraSeleccionada()
	{
		if (this.listaArticulos == null || this.referenciaCompras == null || this.cajaConcepto == null) {
			return;
		}
		Integer numeroElegido = (Integer) this.listaArticulos.getSelectedItem();
		Object ref = this.referenciaCompras.getSelectedItem();
		String refSeleccionada = (ref == null) ? null : ref.toString();
		List<PedidosClientes> lista = (refSeleccionada == null) ? null : this.comprasPorReferencia.get(refSeleccionada);

		if (lista == null || numeroElegido == null || numeroElegido < 1 || numeroElegido > lista.size()) {
			this.limpiarDetalleCompra();
			return;
		}

		PedidosClientes compra = lista.get(numeroElegido - 1);
		this.cajaConcepto.setText(getEstilos(compra.getConcepto()));
		this.cajaDepartamento.setText(getEstilos(compra.getDepartamento()));
		this.cajaCantidad.setText(getEstilos(String.valueOf(compra.getCantidad())));
		this.cajaCosteUnitario.setText(getEstilos(String.valueOf(compra.getCosteUnitario())));
		this.cajaCostetotal.setText(getEstilos(String.valueOf(compra.getCosteTotal())));
		this.cajaReferencia.setText(getEstilos(compra.getReferencia()));
		this.cajaEntregado.setText(getEstilos(compra.getEstadoEntrega()));
		if (compra.getFechaPedido() != null) {
			this.datePicker.setDate(compra.getFechaPedido());
		}
	}

	private void limpiarDetalleCompra()
	{
		if (this.cajaConcepto == null) {
			return;
		}
		this.cajaConcepto.setText(getEstilos(""));
		this.cajaDepartamento.setText(getEstilos(""));
		this.cajaCantidad.setText(getEstilos(""));
		this.cajaCosteUnitario.setText(getEstilos(""));
		this.cajaCostetotal.setText(getEstilos(""));
		this.cajaReferencia.setText(getEstilos(""));
		this.cajaEntregado.setText(getEstilos(""));
		this.datePicker.setDate(null);
	}

    @Override
    public void actionPerformed(ActionEvent e) {
        Object src = e.getSource();
        
        if (src == aceptar) {   //CARGA EL HISTORIAL DE COMPRAS QUE YA SE HABÍAN REALIZADO
				JOptionPane.showMessageDialog(null, "INFORMACIÓN ACTUALIZADA");
				this.registrarListenersHistorial();
				this.cargarHistorialCompras();
        }

        if (src == cancelar) {   //SALE DE LA APLICACION
            JOptionPane.showMessageDialog(null, "Ha decidido salir, Hasta luego");
            System.exit(0);
        }
        if (src == cargar) {   //CARGA EL PANEL DE STOCK CON POSIBILIDAD DE EJECUTAR UNA COMPRA O NO
			this.cargar.setEnabled(false);    //Se deshabilita el botón para evitar crear más instancias del segundo JFrame
			PanelProcesamientoStock nuevo= new PanelProcesamientoStock();
			//ENVIA EL MAPA DE DATOS
        	//Procedemos a mover la ventana hacia la izquierda para mostrar otro panel: el de STOCK disponible
        	MarcoInsertarStock panelStock= new MarcoInsertarStock(true,this.cargar,nuevo.getMapaDatosStock(),this.activadorCompras,this.clienteLogin);
        }
    }
}

////////// AREA DE PANEL DE STOCK //////////

class MarcoInsertarStock extends JFrame
{
    private Point PanelAlmacenajeSalida;
    private JButton botonPrincipal, cerrar, mostrarPanel;
    private int dimensionVerticalScroll=0,numProductos=0,numServicios=0,numProyectos=0;
    private static int opcionCompra;

    public MarcoInsertarStock(Boolean semaforo, JButton cargar, HashMap<Integer, ObjetoVenta> mapeo,boolean activadorCompras,ClienteRegistrado clienteLogin)
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
        getContentPane().setLayout(new BorderLayout());

        this.botonPrincipal = cargar;

        //3) El panel original
        PanelInsertarStock almacen = new PanelInsertarStock("ficherosUtilizados/almacen.jpg", 30, mapeo, clienteLogin,this.dimensionVerticalScroll);

        //4) IMPORTANTE: tamaño mayor para que aparezca scroll
        almacen.setPreferredSize(new Dimension(680,60+65*this.dimensionVerticalScroll)); 

        //5) ScrollPane que contiene tu panel
        JScrollPane scroll = new JScrollPane(almacen);
        scroll.setBounds(0, 0, 680, 500);

        //6) Opcional: siempre mostrar scroll vertical
        scroll.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);
        add(scroll, BorderLayout.CENTER);


        //7) Botón VOLVER (debe estar dentro del panel anterior si se quiere que se cierre el presente)
        cerrar = new JButton("VOLVER");
        cerrar.setBounds(30,60+63*this.dimensionVerticalScroll, 100, 25);
        cerrar.addActionListener(e -> {
            this.botonPrincipal.setEnabled(true);
            this.dispose();
        });
        
        //8) Boton de MOSTRAR EL PANEL COMPLETO DE VENTAS para el usuario
        mostrarPanel= new JButton("MOSTRAR RECOPILADO VENTAS");
        mostrarPanel.setBounds(150,60+63*this.dimensionVerticalScroll, 220, 25);
        mostrarPanel.addActionListener(e -> {
            //DEBE MOSTRAR POR PANTALLA UN CUADRO CON LAS VENTAS SELECCIONADAS Y EL TOTAL
        		opcionCompra=CarritoCompra.getMapaCarro(activadorCompras);
        	//AHORA SI EL USUARIO DE TIPO CLIENTE EJECUTA LA ORDEN DE COMPRAR, NOS VAMOS A INSTANCIAR EL OBJETO CARRITO COMPRA
        		if (opcionCompra == JOptionPane.YES_OPTION) {
        		    //SE ENVIA EL CLIENTE LOGIN PORQUE SE NECESITA SABER QUÉ CLIENTE SE HA CONECTADO Y COMPRADO
        		    //SE ENVIA ADEMAS EL STOCK DE LA EMPRESA PARA MODIFICARLO TRAS EJECUTAR EL PEDIDO
        			try {
        				//SE RODEA EN UNA EXCEPTION PORQUE EN LA INSTANCIACIÓN LANZA EXCEPCIONES SI ALGUNA CONSULTA FALLA
        			    CompraEjecutada ejecucionCompra = new CompraEjecutada(clienteLogin, mapeo);
        			} catch (Exception error) {
        			    error.printStackTrace();
        			}
        		} else if (opcionCompra == JOptionPane.NO_OPTION) {
        			JOptionPane.showMessageDialog(null, "No se realizó la compra!","Compra no realizada", JOptionPane.INFORMATION_MESSAGE);
        		} else {
        			JOptionPane.showMessageDialog(null, "Se cerró la ventana de los presupuestos!","Compra no realizada", JOptionPane.INFORMATION_MESSAGE);
        		}
        });
        //9) Si quieres que el botón se mueva con el scroll:
        almacen.add(cerrar);
        almacen.add(mostrarPanel);

        //10) Si quieres que el botón NO se mueva con el scroll:
        setVisible(semaforo);
        
        //11) Reiniciar las variables estaticas del objeto: ObjetoVenta
        ObjetoVenta.reiniciarVariablesEstaticas();  //Sino se acumula la contabilidad de la verticalidad
    }
}

class PanelInsertarStock extends JPanel implements ActionListener
{
    private BufferedImage imagen;
    private float alfaImagen = 1.0f; // opaco por defecto
    private int punteroProdu=0, punteroServ=0, punteroProy=0;   //Puntero de relleno
    private JLabel productos,servicios,proyectos;
    private HashMap<Integer,ObjetoVenta> mapaStockDatos;
    private ClienteRegistrado clienteLogin;          //SE NECESITAN LOS DATOS DEL USUARIO CLIENTE LOGGEADO
    private JButton realizarCompra;
    private int dimensionVerticalScroll=0;
    
	public PanelInsertarStock(String ruta,int transparencia,HashMap<Integer, ObjetoVenta> mapaStock, ClienteRegistrado clienteLogin,int dimensionVerticalScroll)
	{	
		//1) SE RECOGE EL VALOR DE LA DISPOSICIÓN VERTICAL VARIABLE DE LOS BOTONES DE MOSTRAR MENU, VOLVER Y COMPRAR EN FUNCION DE LA CANTIDAD DE PRODUCTOS, SERVICIOS O PROYECTOS QUE HAYA
			this.dimensionVerticalScroll=dimensionVerticalScroll;
		
		//2) SE RECOGEN LOS DATOS DEL USUARIO LOGGEADO QUE PUEDE O NO HACER COMPRAS USANDO EL BOTON DE AÑADIR AL CARRITO
			this.clienteLogin=clienteLogin;    //SE USARA EN EL BOTON DE AÑDIR AL CARRITO Y EJECUTAR COMPRA
		
		//3) SE GUARDA EL MAPA DE DATOS HASHMAP<CLAVE,VALOR>
			this.mapaStockDatos=mapaStock;
		
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
	//2) ESTETICA DE CAJAS-TITULOS-DESPLEGABLES-FECHAS
		setLayout(null);  //Para que respeten el setBounds
		
	//3) DECLARACION DE BOTONES PARA PODER MOSTRAR AL USUARIO LAS POSIBLES ELECCIONES EXISTENTES
		this.productos=new JLabel("PRODUCTOS");      this.productos.setBounds(30, 10, 180,20);   this.productos.setHorizontalAlignment(SwingConstants.CENTER);   add(this.productos);   
		this.servicios=new JLabel("SERVICIOS");      this.servicios.setBounds(230, 10, 180,20);  this.servicios.setHorizontalAlignment(SwingConstants.CENTER);   add(this.servicios);
		this.proyectos=new JLabel("PROYECTOS");      this.proyectos.setBounds(430, 10, 180,20);  this.proyectos.setHorizontalAlignment(SwingConstants.CENTER);   add(this.proyectos);
		
	//4) DECLARCION DEL BOTON DE LA COMPRA RECOPILADA EN EL CARRITO POR PARTE DEL USUARIO COMO CLIENTE
		this.realizarCompra=new JButton("COMPRAR");  this.realizarCompra.setBounds(390,60+63*this.dimensionVerticalScroll, 120, 25);   this.realizarCompra.setHorizontalAlignment(SwingConstants.CENTER);   
		
		mapaStock.forEach((clave,valor)->
		{
			if("PRODUCTOS".equals(valor.getDestino().trim()))
			{	//SOLO SE MOSTRARAN LOS PRODUCTOS, SERVICIOS O PROYECTOS el resto es de la interfaz Angular de la pagina web				
				
				//SE AÑADIRA EL JBUTTON
				JButton botones= new JButton("<html>"+(this.punteroProdu+1)+") "+valor.getNombre().substring(0, valor.getNombre().length() - 4)+"<br>"+valor.getSector()+"</html>");
				botones.setBounds(30,50+60*this.punteroProdu,180,30);  
				botones.setFont(new Font("Arial", Font.PLAIN, 10));      //tamanio fuente
				botones.setHorizontalAlignment(SwingConstants.CENTER);     //alineacion fuente
				add(botones);
				botones.setActionCommand("ACCIONADO" + valor.getID());  //Registro interno del boton para la deteccion del ActionListener
				botones.addActionListener(this);
				
				//PANEL ADAPTADO AL MODO USUARIO
				//SE AÑADIRA EL JLABEL PARA LA TITULACION DE POSTERIOR JCOMBOBOX
				JLabel titulo= new JLabel("Cantidad PRODUCTOS:");
				titulo.setBounds(30,80+60*this.punteroProdu,165,18); 
				titulo.setFont(new Font("Arial", Font.PLAIN, 10));      //tamanio fuente
				add(titulo);

				//SE AÑADIRA EL JCOMBOBOX PARA LA ELECCION DE CANTIDADES
					//Se llena el vector de opciones numericas
					Integer[] cantidades= new Integer[valor.getCantidad()+1];
					for(int i=0;i<valor.getCantidad()+1;i++)
					{
						cantidades[i]=i;
					}
					//Se rellena el JCOMBOBOX
					JComboBox<Integer>elecciones= new JComboBox<Integer>(cantidades);
					elecciones.setBounds(150,80+60*this.punteroProdu,60,18);  
					elecciones.setFont(new Font("Arial", Font.PLAIN, 10));      //tamanio fuente
					add(elecciones);
					elecciones.setActionCommand("CANTIDAD" + valor.getID());  //Registro interno del boton para la deteccion del ActionListener				
					elecciones.addActionListener(e->{CarritoCompra.getMapaCompras(mapaStock,elecciones);});
				this.punteroProdu++;
			}
			if("SERVICIOS".equals(valor.getDestino().trim()))
			{	//SOLO SE MOSTRARAN LOS PRODUCTOS, SERVICIOS O PROYECTOS el resto es de la interfaz Angular de la pagina web				
				JButton botones= new JButton("<html>"+(this.punteroServ+1)+") "+valor.getNombre().substring(0, valor.getNombre().length() - 4)+"<br>"+valor.getSector()+"</html>");
				botones.setBounds(230,50+60*this.punteroServ,180,30);
				botones.setFont(new Font("Arial", Font.PLAIN, 10));
				botones.setHorizontalAlignment(SwingConstants.CENTER);
				add(botones);
				botones.setActionCommand("ACCIONADO" + valor.getID());  //Registro interno del boton para la deteccion del ActionListener
				botones.addActionListener(this);

				//PANEL ADAPTADO AL MODO USUARIO
				
				//SE AÑADIRA EL JLABEL PARA LA TITULACION DE POSTERIOR JCOMBOBOX
				JLabel titulo= new JLabel("Cantidad SERVICIOS:");
				titulo.setBounds(230,80+60*this.punteroServ,165,18);
				titulo.setFont(new Font("Arial", Font.PLAIN, 10));      //tamanio fuente
				add(titulo);
					
				//SE AÑADIRA EL JCOMBOBOX PARA LA ELECCION DE CANTIDADES
					//Se llena el vector de opciones numericas
					Integer[] cantidades= new Integer[valor.getCantidad()+1];
					for(int i=0;i<valor.getCantidad()+1;i++)
					{
						cantidades[i]=i;
					}
					//Se rellena el JCOMBOBOX
					JComboBox<Integer>elecciones= new JComboBox<Integer>(cantidades);
					elecciones.setBounds(350,80+60*this.punteroServ,60,18);  
					elecciones.setFont(new Font("Arial", Font.PLAIN, 10));      //tamanio fuente
					elecciones.setActionCommand("CANTIDAD" + valor.getID());  //Registro interno del boton para la deteccion del ActionListener
					add(elecciones);
					
					elecciones.setActionCommand("CANTIDAD" + valor.getID());  //Registro interno del boton para la deteccion del ActionListener				
					elecciones.addActionListener(e->{CarritoCompra.getMapaCompras(mapaStock,elecciones);});
				this.punteroServ++;
			}
			if("PROYECTOS".equals(valor.getDestino().trim()))
			{	//SOLO SE MOSTRARAN LOS PRODUCTOS, SERVICIOS O PROYECTOS el resto es de la interfaz Angular de la pagina web				
				JButton botones= new JButton("<html>"+(this.punteroProy+1)+") "+valor.getNombre().substring(0, valor.getNombre().length() - 4)+"<br>"+valor.getSector()+"</html>");
				botones.setBounds(430,50+60*this.punteroProy,180,30);
				botones.setFont(new Font("Arial", Font.PLAIN, 10));
				botones.setHorizontalAlignment(SwingConstants.CENTER);
				add(botones);
				botones.setActionCommand("ACCIONADO" + valor.getID());  //Registro interno del boton para la deteccion del ActionListener
				botones.addActionListener(this);

				//PANEL ADAPTADO AL MODO USUARIO
				
				//SE AÑADIRA EL JLABEL PARA LA TITULACION DE POSTERIOR JCOMBOBOX
				JLabel titulo= new JLabel("Cantidad PROYECTOS:");
				titulo.setBounds(430,80+60*this.punteroProy,165,18); 
				titulo.setFont(new Font("Arial", Font.PLAIN, 10));      //tamanio fuente
				add(titulo);
					
				//SE AÑADIRA EL JCOMBOBOX PARA LA ELECCION DE CANTIDADES
					//Se llena el vector de opciones numericas
					Integer[] cantidades= new Integer[valor.getCantidad()+1];
					for(int i=0;i<valor.getCantidad()+1;i++)
					{
						cantidades[i]=i;
					}
					//Se rellena el JCOMBOBOX
					JComboBox<Integer>elecciones= new JComboBox<Integer>(cantidades);
					elecciones.setBounds(550,80+60*this.punteroProy,60,18);  
					elecciones.setFont(new Font("Arial", Font.PLAIN, 10));      //tamanio fuente
					elecciones.setActionCommand("CANTIDAD" + valor.getID());  //Registro interno del boton para la deteccion del ActionListener
					add(elecciones);
					
					elecciones.setActionCommand("CANTIDAD" + valor.getID());  //Registro interno del boton para la deteccion del ActionListener				
					elecciones.addActionListener(e->{CarritoCompra.getMapaCompras(mapaStock,elecciones);});
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
	    String cmd = e.getActionCommand();
	    String mensaje="";
	    String detallesVenta="";

	    if (cmd.startsWith("ACCIONADO")) 
	    {
	        int indice = Integer.parseInt(cmd.substring(9));
	        detallesVenta=this.mapaStockDatos.get(indice).getDetalles();
	
	        mensaje=
	        		"El producto: "+
	        		this.mapaStockDatos.get(indice).getNombre().substring(0, this.mapaStockDatos.get(indice).getNombre().length()-4)+"\n"+
	        		"Pertenenciente al tipo de venta: "+
	        		this.mapaStockDatos.get(indice).getDestino()+"\n"+
	        		"Perteneciente al subgrupo de ventas: "+
	        		this.mapaStockDatos.get(indice).getSector()+"\n"+
	        		"Tiene un STOCK de: "+
	        		this.mapaStockDatos.get(indice).getCantidad()+" Unidades\n"+
	        		"Tiene un precio de: "+
	        		this.mapaStockDatos.get(indice).getCoste()+" €\n"+
	        		"Cuyos detalles de la venta son:"+
	        		this.fragmentarTexto(detallesVenta, 50)+"\n";
	        		//Se fragmenta el texto en unidades menores para poder visualizar el contenido de los detalles con mayor ergonomia visual
	        JOptionPane.showMessageDialog(
	        		null,
	        	    mensaje,
	        	    "Información de la venta seleccionada del tipo: "+this.mapaStockDatos.get(indice).getDestino(),
	        	    JOptionPane.INFORMATION_MESSAGE
	        	);
	    }
	}
	public String fragmentarTexto(String texto, int maxLongitud) {
	    StringBuilder resultado = new StringBuilder();
	    String[] palabras = texto.split(" ");
	    int lineaActual = 0;

	    for (String palabra : palabras) {
	        if (lineaActual + palabra.length() + 1 > maxLongitud) {
	            resultado.append("\n");
	            lineaActual = 0;
	        }
	        resultado.append(palabra).append(" ");
	        lineaActual += palabra.length() + 1;
	    }
	    return resultado.toString();
	}
}

class PedidosClientes
{
	private int id;
	private String nombre;
	private String correo;    //Verificacion por correo electronico
	private String concepto;
	private String departamento;
	private int cantidad;
	private double costeUnitario;
	private double costeTotal;
	private Date fechaPedido;
	private String referencia;
	private String estadoEntrega;
    private static HashMap<Integer,PedidosClientes> pedidosClientes=new HashMap<>();
	
	public PedidosClientes()
	{
		
	}

	public PedidosClientes(int iD, String nombre, String correo, String concepto, String departamento, int cantidad,
			double costeUnitario, double costeTotal, Date fechaPedido, String referencia, String estadoEntrega) 
	{
		this.id = iD;
		this.nombre = nombre;
		this.correo = correo;
		this.concepto = concepto;
		this.departamento = departamento;
		this.cantidad = cantidad;
		this.costeUnitario = costeUnitario;
		this.costeTotal = costeTotal;
		this.fechaPedido = fechaPedido;
		this.referencia = referencia;
		this.estadoEntrega = estadoEntrega;
	}

	public static HashMap<Integer,PedidosClientes> getPedidosClientes()
	{
		//GENERAMOS LA LLAMADA
		try {
			//1 - CREAR CONEXION
			//En el caso de MYSQL
			Connection conector= DriverManager.getConnection("jdbc:mysql://localhost:3307/bbdd003_clientes","root","1234");
			pedidosClientes.clear();
			
			//2 - CREAR EL STATENMENT
			Statement myst = conector.createStatement();
			
			//3 - EJECUTAR PETICION O CONSULTA SQL: se guardara una tabla virtual dentro de "myrs"
			ResultSet myrs= myst.executeQuery("SELECT ID,NOMBRE,CORREO,CONCEPTO,DEPARTAMENTO,CANTIDAD,COSTE_UNITARIO,COSTE_TOTAL,FECHA_PEDIDO,REFERENCIA,ENTREGADO FROM clientespedidos");
			
			//4 - TRATAMIENTO DE LA FECHA
			java.util.Date fechaJava;     //Convertirla a java.util.Date (para EL DATEPICKER del formulario)
			
			//4 - LEER EL ResultSet
			while(myrs.next())
			{
				//Devuelve los codigos de los articulos
				//Como los productos están agrupados por ID (clave) para apuntar a un objeto (VALOR) se usara HASHMAP
				pedidosClientes.put(myrs.getInt("ID"), new PedidosClientes(     //Guardando en el HASHMAP: OJO no por int columna sino por cabecera de la columna
							myrs.getInt("ID"),    		      //OBTIENE EL ID (SOLO LECTURA NO SE MODIFICARA SU VALOR NUNCA)
							myrs.getString("NOMBRE"),         //OBTIENE EL NOMBRE
							myrs.getString("CORREO"),         //OBTIENE EL CORREO
							myrs.getString("CONCEPTO"),       //OBTIENE EL CONCEPTO
							myrs.getString("DEPARTAMENTO"),   //OBTIENE EL DEPARTAMENTO
							myrs.getInt("CANTIDAD"),		  //OBTIENE LA CANTIDAD
							myrs.getDouble("COSTE_UNITARIO"), //OBTIENE EL COSTE UNITARIO
							myrs.getDouble("COSTE_TOTAL"),    //OBTIENE EL COSTE TOTAL
							fechaJava = new java.util.Date(myrs.getDate("FECHA_PEDIDO").getTime()),  //OBTIENE LA FECHA CONVERTIDA TRAS EXTRACCION EN DATEPICKER
							myrs.getString("REFERENCIA"),     //OBTIENE LA REFERENCIA
							myrs.getString("ENTREGADO")       //OBTIENE EL ESTADO DEL PEDIDO
						));
			}
			//Si se ha terminado la operación se cierra todo como buena practica
			myrs.close();  //Liberar los recursos que se usaban en memoria
			conector.close();  //Liberar el conector que se establecio
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return pedidosClientes;
	}
	
	public int getID() {
		return this.id;
	}
	public void setID(int iD) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getCorreo() {
		return correo;
	}
	public void setCorreo(String correo) {
		this.correo = correo;
	}
	public String getConcepto() {
		return concepto;
	}
	public void setConcepto(String concepto) {
		this.concepto = concepto;
	}
	public String getDepartamento() {
		return departamento;
	}
	public void setDepartamento(String departamento) {
		this.departamento = departamento;
	}
	public int getCantidad() {
		return cantidad;
	}
	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}
	public double getCosteUnitario() {
		return costeUnitario;
	}
	public void setCosteUnitario(double costeUnitario) {
		this.costeUnitario = costeUnitario;
	}
	public double getCosteTotal() {
		return costeTotal;
	}
	public void setCosteTotal(double costeTotal) {
		this.costeTotal = costeTotal;
	}
	public Date getFechaPedido() {
		return fechaPedido;
	}
	public void setFechaPedido(Date fechaPedido) {
		this.fechaPedido = fechaPedido;
	}
	public String getReferencia() {
		return referencia;
	}
	public void setReferencia(String referencia) {
		this.referencia = referencia;
	}
	public String getEstadoEntrega() {
		return estadoEntrega;
	}
	public void setEstadoEntrega(String estadoEntrega) {
		this.estadoEntrega = estadoEntrega;
	}
}
