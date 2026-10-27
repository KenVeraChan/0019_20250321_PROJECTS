package conexionesJDBC;                //// ZONA: ADMINISTRACION  ////

import java.awt.AlphaComposite;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.HashMap;

import javax.imageio.ImageIO;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

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

    //2) LABELS DE QUÉ ACCIONES POSEEN LOS DE ADMINISTRACIÓN
    private JLabel compras,aspirantes,tareas,stock;  //Gestion de compras clientes, gestión de futuros empleados, gestión tareas empresariales y gestion de stock 

	//3) DECLARACION DE BOTONES Y ACCIONAMIENTOS
	private JButton cajaCompras, cajaAspirantes, cajaTareas, cajaStock;
	
	//4) DECLARACION DEL CUADROBASE PARA POSTERIOR UTILIZACION PARA EJECUTAR LAS FUNCIONES DEL ADMINISTRADOR
	private MarcoBaseOp cuadroBase;
	
	//5) DECLARACION DE LOS BOTONES DE ACEPTAR CAMBIOS Y CANCELAR OPERACION QUE SIEMPRE APARECERAN EN LAS CUATRO FUNCIONES DEL PANEL
	private JButton aceptar,cancelar;
	
	//6) DECLARACION DEL OBJETO USADO PARA DETECTAR LA FUNCION DE LAS CUATRO PROPUESTAS, QUE FUE ELEGIDA
	private Object selector;
	
	//7) DECLARACION DE LAS VARIABES, DESPLEGABLES Y BOTONES DE LA ZONA DE ADMINISTRACION
	
	//7.3) GESTION DE TAREAS
	private JLabel tituloID, tituloTarea, tituloDepartamento, tituloTecnicos, tituloCostes, tituloFecha, tituloResolucion, tituloResolucionActual;  
	private JLabel cajaID, cajaDepartamento, cajaTecnicos, cajaCostes, cajaFecha, cajaResolucion;
	private JComboBox<String> cajaTarea, cajaResolucionActual;
	
	//7.4) REPOSICION STOCK DE ALMACENAJE
    private int punteroProdu=0, punteroServ=0, punteroProy=0;   //Puntero de relleno
    private JLabel tituloCategoria,tituloArticulo,tituloCantidad,tituloCantidadActual,cajaCantidadActual;
    private JComboBox<String> cajaCategoria;
    private JComboBox<String> cajaArticulo;
    private JComboBox<Integer> cajaCantidad;
    
	//8) DECLARACION DEL OBJETO HASHMAP PARA LA SELECCION DE DATOS DEL STOCK ACTUAL
	private HashMap<Integer, ObjetoVenta> stockActual= new HashMap<>();
	private int puntero=0; //Valor a ser recorrido dentro del vector de los PRODUCTOS, SERVICIOS O PROYECTOS para ser rellenado
	
	//9) DECLARACION DEL OBJETO HASHMAP MOMENTANEO QUE GUARDE DATOS DEL NOMBRE ARTICULO Y CANTIDAD
		//ELIGIENDO UN ARTICULO ACTIVE UN EVENTLISTENER Y LUEGO CAMBIE EL VALOR NUMERICO DE SU CANTIDAD
	private HashMap<String,Integer> stockMomentaneo= new HashMap<>();

	//10) DECLARACION DE LA CANTIDAD EXTRAIDA DEL HASHMAP MOMENTANEO PARA PONER CANTIDAD EN EL JLABEL
	private String cantidadConcepto;

	//11) LOS CUATRO MENUS SE CONSTRUYEN UNA SOLA VEZ Y LUEGO SOLO CAMBIA SU VISIBILIDAD
	private boolean menusCargados = false;
	private boolean listenerStockRegistrado = false;
	private boolean cargandoStock = false;
	
	public PanelModificar(String ruta, int transparencia,MarcoBaseOp cuadroBase)
	{
		//PANEL DEL ADMINISTRADOR: recepcion del cuadro FRAME base anterior para la carga de las funciones del administrador
		this.cuadroBase=cuadroBase;
		
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
			
		//3) ADICION DE LABELS DECLARADOS
			this.compras= new JLabel("GESTIÓN DE COMPRAS");        this.compras.setBounds(120,30,180,20);      add(this.compras); 
			this.aspirantes= new JLabel("GESTIÓN DE ASPIRANTES");  this.aspirantes.setBounds(120,110,180,20);  add(this.aspirantes); 
			this.tareas= new JLabel("GESTIÓN DE TAREAS");          this.tareas.setBounds(120,190,180,20);      add(this.tareas); 
			this.stock= new JLabel("GESTIÓN DE STOCK");            this.stock.setBounds(120,270,180,20);       add(this.stock); 

		//4) ADICION DE BOTONES DECLARADOS
			this.cajaCompras= new JButton("ACCEDER A COMPRAS");         this.cajaCompras.setBounds(80,70,230,20);      add(this.cajaCompras);
			this.cajaAspirantes= new JButton("ACCEDER A ASPIRANTES");   this.cajaAspirantes.setBounds(80,150,230,20);  add(this.cajaAspirantes);
			this.cajaTareas= new JButton("ACCEDER A TAREAS");           this.cajaTareas.setBounds(80,230,230,20);      add(this.cajaTareas);
			this.cajaStock= new JButton("ACCEDER A REPOSICIÓN STOCK");  this.cajaStock.setBounds(80,310,230,20);       add(this.cajaStock);

		//5) DECLARACION DE LOS SETNAME DE LOS BOTONES PARA POSTERIORES USOS
			this.cajaCompras.setName("cajaCompras"); 
			this.cajaAspirantes.setName("cajaAspirantes"); 
			this.cajaTareas.setName("cajaTareas"); 
			this.cajaStock.setName("cajaStock"); 
			
	    //6) DECLARACION DE LOS ACTIONLISTENER
			//REACCIONES DEL BOTON ACEPTAR Y CANCELAR OPERACIONES
			this.cajaCompras.addActionListener(this);
			this.cajaAspirantes.addActionListener(this);
			this.cajaTareas.addActionListener(this);
			this.cajaStock.addActionListener(this);
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
		Object src = e.getSource();
		//SE DIBUJA LA INTERFAZ Y SE PREPARA TODO SEGUN EL OBJETO IMPLICADO ELEGIDO
		 ubicacionBotones(e.getSource());
	}

	public void ubicacionBotones(Object seleccionado)
	{
        //1) Se deshabilitan los botones para evitar interferencias entre funciones ejecutadas al mismo tiempo
        	this.cajaCompras.setEnabled(false);
			this.cajaAspirantes.setEnabled(false);
			this.cajaTareas.setEnabled(false);
			this.cajaStock.setEnabled(false);
			
		//2) Se redimensiona el FRAME añadido
			this.cuadroBase.setBounds(250,100,720,400);
			this.selector = seleccionado;
			
		//3) Se expone la interfaz elegida correspondientes a la FUNCION ELEGIDA
			this.dibujaInterfazElegida(seleccionado);  
			
	    //4) Los botones comunes se crean una sola vez y se vuelven a mostrar
			if (this.aceptar == null) {
				this.aceptar= new JButton("CONFIRMAR ACCIONES");   this.aceptar.setBounds(440,270,190,20);   add(this.aceptar);
				this.cancelar= new JButton("CANCELAR OPERACIÓN");  this.cancelar.setBounds(440,310,190,20);   add(this.cancelar);
				this.aceptar.addActionListener(evento -> this.confirmarMenuActual());
				this.cancelar.addActionListener(evento -> this.reestablecerInterfazInicial(this.selector));
			}
			this.aceptar.setVisible(true);
			this.cancelar.setVisible(true);
		
		//5) Se deshabilitan el boton de EJECUTAR ACCIONES pero no el de CANCELAR porque se puede volver sin hacer nada
			this.aceptar.setEnabled(false);
	}
	private void confirmarMenuActual()
	{
		if (!(this.selector instanceof JButton)) {
			return;
		}
		String valorBoton = ((JButton) this.selector).getName();
		if (!"cajaStock".equals(valorBoton)) {
			return;
		}
		if (this.cajaCantidadActual.getText() == null || this.cajaCantidad.getSelectedItem() == null
				|| this.cajaArticulo.getSelectedItem() == null || this.cajaCategoria.getSelectedItem() == null) {
			return;
		}
		int stockFinal = Integer.parseInt(this.cajaCantidadActual.getText()) + Integer.parseInt(this.cajaCantidad.getSelectedItem().toString());
		try {
			Connection conector04 = DriverManager.getConnection("jdbc:mysql://localhost:3307/bbdd003_clientes","root","1234");
			String sql1 = "UPDATE imagenesinterfazweb SET STOCK = ? WHERE NOMBRE = ? AND DESTINO = ?";
			PreparedStatement myst1 = conector04.prepareStatement(sql1);
			myst1.setInt(1, stockFinal);
			myst1.setString(2, this.cajaArticulo.getSelectedItem().toString()+".png");
			myst1.setString(3, this.cajaCategoria.getSelectedItem().toString());
			int filasAfectadas = myst1.executeUpdate();
			if (filasAfectadas > 0) {
				String articuloActual = this.cajaArticulo.getSelectedItem().toString();
				this.stockMomentaneo.put(articuloActual, stockFinal);
				this.cajaCantidadActual.setText(String.valueOf(stockFinal));
			}
			JOptionPane.showMessageDialog(null, "Filas actualizadas en la Base de Datos: " + filasAfectadas +" filas y base de datos e Interfaz sincronizadas con éxito","Información de Stock",JOptionPane.INFORMATION_MESSAGE);
			if (filasAfectadas == 0) {
				System.out.println("ALERTA: No se encontró ningún registro que coincida exactamente con NOMBRE='"
					+ this.cajaArticulo.getSelectedItem().toString()
					+ "' y DESTINO='" + this.cajaCategoria.getSelectedItem().toString() + "'");
			}
			myst1.close();
			conector04.close();
		} catch (Exception error) {
			error.printStackTrace();
		}
	}
	public void reestablecerInterfazInicial(Object seleccionado)
	{
    	this.cajaCompras.setEnabled(true);
		this.cajaAspirantes.setEnabled(true);
		this.cajaTareas.setEnabled(true);
		this.cajaStock.setEnabled(true);
		this.invisibilizarTodosLosMenus();
		if (this.aceptar != null) {
			this.aceptar.setVisible(false);
		}
		if (this.cancelar != null) {
			this.cancelar.setVisible(false);
		}
		this.cuadroBase.setBounds(250,100,420,400);
	}
	public void preparaInterfaz(Boolean activadorInicial, Object objetoElegido)
	{
		//1) CARGA TODOS LOS COMPONENTES COMPLETOS DE TODOS LOS CUATRO MENUS UNA SOLA VEZ
		if(activadorInicial)
		{
		  if (this.menusCargados) {
			  return;
		  }
		  //0) COLOCA LOS JLABELS CORRESPONDIENTES
			
			///0.1) ADMINISTRACION DE LAS COMPRAS
			
			///0.2) ADMINISTRACION DE LOS ASPIRANTES
			
			///0.3) ADMINISTRACION DE LAS TAREAS
			
				this.tituloID= new JLabel("ID:");                      this.tituloID.setBounds(400,30,190,20);             add(this.tituloID);   
				this.tituloTarea= new JLabel("TAREA:");                this.tituloTarea.setBounds(400,60,190,20);         add(this.tituloTarea);   
				this.tituloDepartamento= new JLabel("DEPARTAMENTO:");  this.tituloDepartamento.setBounds(400,90,190,20);  add(this.tituloDepartamento);   
				this.tituloTecnicos=new JLabel("TECNICOS:");           this.tituloTecnicos.setBounds(400,120,190,20);      add(this.tituloTecnicos);
				this.tituloCostes= new JLabel("COSTES:");              this.tituloCostes.setBounds(400,150,190,20);         add(this.tituloCostes);   
				this.tituloFecha= new JLabel("FECHA:");                     this.tituloFecha.setBounds(400,180,190,20);         add(this.tituloFecha);   
				this.tituloResolucion= new JLabel("RESOLUCION ANTERIOR:");  this.tituloResolucion.setBounds(400,210,190,20);    add(this.tituloResolucion);   
				this.tituloResolucionActual= new JLabel("RESOLUCION ACTUAL:");    this.tituloResolucionActual.setBounds(400,240,190,20);    add(this.tituloResolucionActual);   
				
				this.cajaID= new JLabel("NO RECONOCIDO");			 this.cajaID.setBounds(550,30,150,20);            add(this.cajaID);
				this.cajaDepartamento= new JLabel("NO RECONOCIDO");  this.cajaDepartamento.setBounds(550,90,150,20);  add(this.cajaDepartamento);
				this.cajaTecnicos= new JLabel("NO RECONOCIDO");	     this.cajaTecnicos.setBounds(550,120,150,20);	  add(this.cajaTecnicos);
				this.cajaCostes= new JLabel("NO RECONOCIDO");		 this.cajaCostes.setBounds(550,150,150,20);	      add(this.cajaCostes);
				this.cajaFecha= new JLabel("NO RECONOCIDO");		 this.cajaFecha.setBounds(550,180,150,20);        add(this.cajaFecha); 
				this.cajaResolucion= new JLabel("NO RECONOCIDO");    this.cajaResolucion.setBounds(550,210,150,20);   add(this.cajaResolucion);
				
				this.cajaTarea= new JComboBox<>();    this.cajaTarea.setBounds(550,60,150,20);        add(this.cajaTarea);
				this.cajaResolucionActual= new JComboBox<>();   this.cajaResolucionActual.setBounds(550,240,150,20);  add(this.cajaResolucionActual);
			
			///0.4) ADMINISTRACION DEL STOCK

				this.tituloCategoria= new JLabel("CATEGORIA");  this.tituloCategoria.setBounds(400,90,190,20);   add(this.tituloCategoria);   
				this.tituloArticulo= new JLabel("ARTICULO");    this.tituloArticulo.setBounds(400,130,190,20);   add(this.tituloArticulo);   
				this.tituloCantidad= new JLabel("CANTIDAD");    this.tituloCantidad.setBounds(400,170,190,20);   add(this.tituloCantidad);   
				this.tituloCantidadActual=new JLabel("CANTIDAD ACTUAL: ");  this.tituloCantidadActual.setBounds(400,210,190,20);  add(this.tituloCantidadActual);
	
				this.cajaCategoria= new JComboBox<String>();
				this.cajaCategoria.addItem("PRODUCTOS");
				this.cajaCategoria.addItem("SERVICIOS");
				this.cajaCategoria.addItem("PROYECTOS");
				this.cajaCategoria.setBounds(480,90,200,20);
				add(this.cajaCategoria);
				this.cajaArticulo= new JComboBox<String>();   this.cajaArticulo.setBounds(480, 130, 200, 20);     add(this.cajaArticulo); 
				this.cajaCantidad= new JComboBox<Integer>();  this.cajaCantidad.setBounds(480, 170, 200, 20);     add(this.cajaCantidad);   
				this.cajaCantidadActual=new JLabel();         this.cajaCantidadActual.setBounds(520, 210,200,20); add(this.cajaCantidadActual);
				this.registrarListenersStock();
				this.menusCargados = true;
				this.invisibilizarTodosLosMenus();
		}
		else
		{
			//2) LOS HACE INVISIBLES TODOS ELLOS
			  invisibilizarTodosLosMenus();  //invisibiliza todos y luego pone los que pertenezcan a un menu concreto
			
			if(objetoElegido==cajaCompras)
			{
				
			}
			if(objetoElegido==cajaAspirantes)
			{
				
			}
			if(objetoElegido==cajaTareas)
			{
			   //2.3.1) SE VISIBILIZAN TODOS PORQUE SE HAN INVOCADO EN EL MENU CORRESPONDIENTE
				this.tituloID.setVisible(true);            this.cajaID.setVisible(true);
				this.tituloTarea.setVisible(true);		   this.cajaTarea.setVisible(true);
				this.tituloDepartamento.setVisible(true);  this.cajaDepartamento.setVisible(true);
				this.tituloTecnicos.setVisible(true);      this.cajaTecnicos.setVisible(true);
				this.tituloCostes.setVisible(true);		   this.cajaCostes.setVisible(true);
				this.tituloFecha.setVisible(true);		   this.cajaFecha.setVisible(true);
				this.tituloResolucion.setVisible(true);	   this.cajaResolucion.setVisible(true);
				this.tituloResolucionActual.setVisible(true);
				this.cajaResolucionActual.setVisible(true);
			}
			if(objetoElegido==cajaStock)
			{	
				//2.4.1) SE VISIBILIZAN TODOS PORQUE SE HAN INVOCADO EN EL MENU CORRESPONDIENTE
				this.tituloCategoria.setVisible(true);
				this.tituloArticulo.setVisible(true);
				this.tituloCantidad.setVisible(true);
				this.tituloCantidadActual.setVisible(true);
				
				this.cajaCategoria.setVisible(true);
				this.cajaArticulo.setVisible(true);
				this.cajaCantidad.setVisible(true);
				this.cajaCantidadActual.setVisible(true);
			}
			//3) HARA VISIBLES CON UN CONDICIONAL AQUEL MENU QUE SE HAYA ELEGIDO
		}
	}
	public void invisibilizarTodosLosMenus()
	{
	  ///0.1) ADMINISTRACION DE LAS COMPRAS
	
	  ///0.2) ADMINISTRACION DE LOS ASPIRANTES
	  
	  ///0.3) ADMINISTRACION DE LAS TAREAS
	   //0.3.1) SE INVISIBILIZAN TODOS PORQUE NO SE HAN INVOCADO EN EL MENU SOLO LLAMADO A PRESENCIA
		this.tituloID.setVisible(false);               this.cajaID.setVisible(false);
		this.tituloTarea.setVisible(false);			   this.cajaTarea.setVisible(false);
		this.tituloDepartamento.setVisible(false);	   this.cajaDepartamento.setVisible(false);
		this.tituloTecnicos.setVisible(false);         this.cajaTecnicos.setVisible(false);
		this.tituloCostes.setVisible(false);		   this.cajaCostes.setVisible(false);
		this.tituloFecha.setVisible(false);			   this.cajaFecha.setVisible(false);
		this.tituloResolucion.setVisible(false);	   this.cajaResolucion.setVisible(false);
		this.tituloResolucionActual.setVisible(false);
		this.cajaResolucionActual.setVisible(false);
		
	  ///0.4) ADMINISTRACION DEL STOCK
		//0.4.1) SE INVISIBILIZAN TODOS PORQUE NO SE HAN INVOCADO EN EL MENU SOLO LLAMADO A PRESENCIA
		if (this.tituloCategoria == null) {
			return;
		}
		this.tituloCategoria.setVisible(false);
		this.tituloArticulo.setVisible(false);
		this.tituloCantidad.setVisible(false);
		this.tituloCantidadActual.setVisible(false);
		
		this.cajaCategoria.setVisible(false);
		this.cajaArticulo.setVisible(false);
		this.cajaCantidad.setVisible(false);
		this.cajaCantidadActual.setVisible(false);
	}
	public void dibujaInterfazElegida(Object objetoElegido)
	{
		//1) LA PRIMERA VEZ CREA TODOS LOS ELEMENTOS. DESPUES SOLO CAMBIA LA VISIBILIDAD
		this.preparaInterfaz(true, objetoElegido);
		this.preparaInterfaz(false, objetoElegido);

		if(objetoElegido==cajaCompras)
		{
			JOptionPane.showMessageDialog(null, "SELECCIONADA CAJA COMPRAS","Información de Stock",JOptionPane.INFORMATION_MESSAGE);
		}
		if(objetoElegido==cajaAspirantes)
		{
			JOptionPane.showMessageDialog(null, "SELECCIONADA CAJA ASPIRANTES","Información de Stock",JOptionPane.INFORMATION_MESSAGE);	
		}
		if(objetoElegido==cajaTareas)
		{
			//JOptionPane.showMessageDialog(null, "SELECCIONADA CAJA TAREAS","Información de Stock",JOptionPane.INFORMATION_MESSAGE);
		}
		if(objetoElegido==cajaStock)
		{
			this.cargarDatosStock();
			this.rellenarArticulosStock();
			//JOptionPane.showMessageDialog(null, "SELECCIONADA CAJA STOCK","Información de Stock",JOptionPane.INFORMATION_MESSAGE);
		}
	}
	private void registrarListenersStock()
	{
		if (this.listenerStockRegistrado || this.cajaArticulo == null || this.cajaCategoria == null) {
			return;
		}
		this.listenerStockRegistrado = true;
		this.cajaArticulo.addItemListener(estado -> {
			if (this.cargandoStock || estado.getStateChange() != ItemEvent.SELECTED) {
				return;
			}
			Object itemSeleccionado = estado.getItem();
			Integer cantidad = this.stockMomentaneo.get(itemSeleccionado);
			if (cantidad != null) {
				this.cantidadConcepto = String.valueOf(cantidad);
			} else {
				this.cantidadConcepto = String.valueOf(this.stockMomentaneo.values().stream().findFirst().orElse(0));
			}
			if (this.cajaCantidadActual != null) {
				this.cajaCantidadActual.setText(this.cantidadConcepto);
			}
		});
		this.cajaCategoria.addActionListener(e -> {
			if (this.aceptar != null) {
				this.aceptar.setEnabled(true);
			}
			this.rellenarArticulosStock();
		});
	}
	private void cargarDatosStock()
	{
		PanelProcesamientoStock nuevo = new PanelProcesamientoStock();
		this.stockActual = nuevo.getMapaDatosStock();
	}
	private void rellenarArticulosStock()
	{
		if (this.cajaCategoria == null || this.cajaArticulo == null || this.cajaCantidad == null) {
			return;
		}
		String seleccionado = (String) this.cajaCategoria.getSelectedItem();
		if (seleccionado == null || this.stockActual == null) {
			return;
		}
		this.stockMomentaneo.clear();
		this.cargandoStock = true;
		this.cajaArticulo.removeAllItems();
		this.cajaCantidad.removeAllItems();
		int incremento = 0;
		String destino = "";
		if (seleccionado.equals("PRODUCTOS")) {
			incremento = 150;
			destino = "PRODUCTOS";
		} else if (seleccionado.equals("SERVICIOS")) {
			incremento = 10;
			destino = "SERVICIOS";
		} else if (seleccionado.equals("PROYECTOS")) {
			incremento = 5;
			destino = "PROYECTOS";
		}
		if (!destino.isEmpty()) {
			final String destinoElegido = destino;
			this.stockActual.forEach((clave, valor) -> {
				if (valor.getDestino() != null && valor.getDestino().startsWith(destinoElegido) && valor.getNombre() != null && valor.getNombre().length() > 4) {
					String nombreLimpio = valor.getNombre().substring(0, valor.getNombre().length() - 4);
					this.stockMomentaneo.put(nombreLimpio, valor.getCantidad());
					this.cajaArticulo.addItem(nombreLimpio);
				}
			});
			for (this.puntero = 1; this.puntero < this.stockActual.size() && this.puntero < 11; this.puntero++) {
				this.cajaCantidad.addItem(this.puntero * incremento);
			}
		}
		this.cargandoStock = false;
		if (this.cajaArticulo.getItemCount() == 0) {
			this.cajaCantidadActual.setText("Elija Artículo 1!");
		} else {
			Object primerItem = this.cajaArticulo.getSelectedItem();
			Integer cantidad = this.stockMomentaneo.get(primerItem);
			this.cantidadConcepto = String.valueOf(cantidad == null ? 0 : cantidad);
			this.cajaCantidadActual.setText(this.cantidadConcepto);
		}
	}
}