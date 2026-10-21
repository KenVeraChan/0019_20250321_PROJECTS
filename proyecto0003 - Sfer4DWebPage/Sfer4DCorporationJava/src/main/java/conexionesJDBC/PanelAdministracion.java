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
	//7.1) REPOSICION STOCK DE ALMACENAJE
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

	    //5) DECLARACION DE LOS ACTIONLISTENER
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
        //if (src == aceptar) {   //EJECUTA LA ACCION CORRESPONDIENTE A LA SELECCION DEL MENU ANTERIOR
    	  //1) SE EJECUTAN LAS ACCIONES SEGUN EL SELECTOR DEL MENU PRINCIPAL
            if(this.getSelector()==cajaCompras)
            {
            	JOptionPane.showInputDialog("Elegido CAJA COMPRAS");
            }
            if(this.getSelector()==cajaAspirantes)
            {
            	JOptionPane.showInputDialog("Elegido CAJA ASPIRANTES");
            }
            if(this.getSelector()==cajaTareas)
            {
            	JOptionPane.showInputDialog("Elegido CAJA TAREAS");
            }
            if(this.getSelector()==cajaStock)
            {
            	JOptionPane.showInputDialog("Elegido CAJA STOCK");
            }
	}
	
	public void setSelector(Object objetoElegido)
	{
		this.selector=objetoElegido;
	}
	public Object getSelector()
	{
		return this.selector;
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
	
		//3) Se guarda el selector que fue elegido para tener la funcion detectada
			this.setSelector(seleccionado);
			
		//4) Se expone la interfaz elegida correspondientes a la FUNCION ELEGIDA
			this.dibujaInterfazElegida(seleccionado);  
			
	    //5) Aparicion del sistema de botones
			this.aceptar= new JButton("CONFIRMAR ACCIONES");   this.aceptar.setBounds(440,270,190,20);   add(this.aceptar);
			this.cancelar= new JButton("CANCELAR OPERACIÓN");  this.cancelar.setBounds(440,310,190,20);   add(this.cancelar);				
		
		//6) Se adicionan los EventListeners de los dos botones
			this.aceptar.addActionListener(e->{
            	JOptionPane.showInputDialog("HAS ACEPTADO OPERACION. EJECUTANDO ACCIONES");
			});     //METER EN UNA ASGINACIONN LAMDA LAS ACCIONES DE LISTENER AQUI
			this.cancelar.addActionListener(e->{
            	JOptionPane.showInputDialog("HAS CANCELADO OPERACION");
                //SE EJECUTAN EL RETORNO DE LA INTERFAZ ANTERIOR TRAS TERMINADAS LAS ACCIONES
           		this.reestablecerInterfazInicial();
			});
		
		//7) Se deshabilitan el boton de EJECUTAR ACCIONES pero no el de CANCELAR porque se puede volver sin hacer nada
			this.aceptar.setEnabled(false);
	}
	public void reestablecerInterfazInicial()
	{
    	//2) Se vuelven a habilitar los botones con todas las acciones que poseia adminsitracion
    	this.cajaCompras.setEnabled(true);
		this.cajaAspirantes.setEnabled(true);
		this.cajaTareas.setEnabled(true);
		this.cajaStock.setEnabled(true);
	
		//3) Se desaparecen todo el cuadro de botones y desplegables que se adicionaron:
			
			//3.1) DE LA FUNCION: CAJA COMPRAS
		
			//3.2) DE LA FUNCION: CAJA ASPIRANTES
			
			//3.3) DE LA FUNCION: CAJA TAREAS
			
			//3.4) DE LA FUNCION: CAJA STOCK
				//3.4.1) LABELS QUE DESAPARECEN
					this.tituloCategoria.setVisible(false);
					this.tituloArticulo.setVisible(false);
					this.tituloCantidad.setVisible(false);
					this.tituloCantidadActual.setVisible(false);
				//3.4.2) CAJAS DESPLEGABLES
					this.cajaArticulo.setVisible(false);
					this.cajaCategoria.setVisible(false);
					this.cajaCantidad.setVisible(false);
			//3.5) DE LOS BOTONES QUE SON COMUNES PARA TODOS
			this.aceptar.setVisible(false);
			this.cancelar.setVisible(false);
			
		//4) Se devuelve el setbounds a la forma anterior
			this.cuadroBase.setBounds(250,100,420,400);
	}
	public void dibujaInterfazElegida(Object objetoElegido)
	{
		if(objetoElegido==cajaCompras)
		{
			JOptionPane.showMessageDialog(null, "SELECCIONADA CAJA COMPRAS");
		}
		if(objetoElegido==cajaAspirantes)
		{
			JOptionPane.showMessageDialog(null, "SELECCIONADA CAJA ASPIRANTES");	
		}
		if(objetoElegido==cajaTareas)
		{
			JOptionPane.showMessageDialog(null, "SELECCIONADA CAJA TAREAS");
		}
		if(objetoElegido==cajaStock)
		{	
			//0) COLOCA LOS JLABELS CORRESPONDIENTES
			this.tituloCategoria= new JLabel("CATEGORIA");  this.tituloCategoria.setBounds(400,90,190,20);   add(this.tituloCategoria);   
			this.tituloArticulo= new JLabel("ARTICULO");    this.tituloArticulo.setBounds(400,130,190,20);    add(this.tituloArticulo);   
			this.tituloCantidad= new JLabel("CANTIDAD");    this.tituloCantidad.setBounds(400,170,190,20);   add(this.tituloCantidad);   
			this.tituloCantidadActual=new JLabel("CANTIDAD ACTUAL");  this.tituloCantidadActual.setBounds(400,210,190,20);  add(this.tituloCantidadActual);
			
			//1) INVOCA EL STOCK QUE QUEDA PARA EL CASO DE REPOSICION DE ALMACENAJE
			PanelProcesamientoStock nuevo= new PanelProcesamientoStock();
			
			//2) GUARDADO DE STOCK ACTUAL EN LA VARIABLE CREADA ANTERIORMENTE
			stockActual=nuevo.getMapaDatosStock();
			
			//3) SE RELLENA EL PRIMER JCOMBOBOX DE CATEGORIAS
				this.cajaCategoria= new JComboBox<String>();  
				this.cajaCategoria.addItem("PRODUCTOS");
				this.cajaCategoria.addItem("SERVICIOS");
				this.cajaCategoria.addItem("PROYECTOS");
				
				this.cajaCategoria.setBounds(480,90,200,20);   
				add(this.cajaCategoria);
			
			//4) DECLARACION DE LOS JCOMBOBOX RESTANTES: ARTICULOS Y CANTIDADES, QUE SERAN VARIABLES SEGUN EL SELECTOR
				this.cajaArticulo= new JComboBox<String>();
				this.cajaCantidad= new JComboBox<Integer>();  
				
			//5) SE ESTABLECE EL DETECTOR DE CAMBIO DE CATEGORIA Y POR CONSIGUIENTE CAMBIO DE SECTOR DE ARTICULOS MOSTRADOS EN EL SEGUNDO JCOMBOBOX
			  //5.1) SE DECLARA LA VARIABLE QUE IRA EN EL JLABEL
				this.cantidadConcepto="";
			  //5.2) SE PROCEDE CON EL ASIGNAMIENTO DE LOS ARTICULOS QUE FUERON ASIGNADOS A QUE CATEGORIA
				//CAMBIARA SEGUN LA CATEGORIA ELEGIDA
				this.cajaCantidadActual=new JLabel();		

				// 1. EL LISTENER DE LA CAJA ARTÍCULO SE DEFINE UNA SOLA VEZ FUERA PARA EVITAR DUPLICADOS
				this.cajaArticulo.addItemListener(estado -> {
				    if (estado.getStateChange() == ItemEvent.SELECTED) {
				        Object itemSeleccionado = estado.getItem();
				        Integer cantidad = this.stockMomentaneo.get(itemSeleccionado);

				        if (cantidad != null) {
				            this.cantidadConcepto = cantidad + " unidades";
				        } else {
				            this.cantidadConcepto = "Elija artículo!";
				        }
				        
				        // ¡CRÍTICO! Actualizar el texto del JLabel en tiempo real
				        if (this.cajaCantidadActual != null) {
				            this.cajaCantidadActual.setText(this.cantidadConcepto);
				        }
				    }
				});
				
				this.cajaCategoria.addActionListener(e -> {
				    // 5.3) BORRADO DEL MAPA MOMENTANEO
				    this.stockMomentaneo.clear();
				    
				    // 5.4) SE HABILITAN LOS BOTONES
				    this.aceptar.setEnabled(true);
				    
				    String seleccionado = (String) this.cajaCategoria.getSelectedItem();
				    if (seleccionado == null) return;

				    // Limpieza previa de los combos
				    this.cajaArticulo.removeAllItems();  
				    this.cajaCantidad.removeAllItems();  

				    // USAR .equals() PARA COMPARAR STRINGS EN JAVA
				    if (seleccionado.equals("PRODUCTOS")) {
				        stockActual.forEach((clave, valor) -> {
				            if (valor.getDestino().toString().startsWith("PRODUCTOS")) {
				                String nombreLimpio = valor.getNombre().substring(0, valor.getNombre().length() - 4);
				                this.cajaArticulo.addItem(nombreLimpio);
				                this.stockMomentaneo.put(nombreLimpio, valor.getCantidad());  
				            }
				        });
				        
				        for (puntero = 1; puntero < stockActual.size() && puntero < 11; puntero++) {
				            this.cajaCantidad.addItem(puntero * 150);  
				        }
				    }
				    else if (seleccionado.equals("SERVICIOS")) {
				        stockActual.forEach((clave, valor) -> {
				            if (valor.getDestino().toString().startsWith("SERVICIOS")) {
				                String nombreLimpio = valor.getNombre().substring(0, valor.getNombre().length() - 4);
				                this.cajaArticulo.addItem(nombreLimpio);
				                this.stockMomentaneo.put(nombreLimpio, valor.getCantidad());  
				            }
				        });
				        
				        for (puntero = 1; puntero < stockActual.size() && puntero < 11; puntero++) {
				            this.cajaCantidad.addItem(puntero * 10);  
				        }
				    }
				    else if (seleccionado.equals("PROYECTOS")) {
				        stockActual.forEach((clave, valor) -> {
				            if (valor.getDestino().toString().startsWith("PROYECTOS")) {
				                String nombreLimpio = valor.getNombre().substring(0, valor.getNombre().length() - 4);
				                this.cajaArticulo.addItem(nombreLimpio);
				                this.stockMomentaneo.put(nombreLimpio, valor.getCantidad());  
				            }
				        });
				        
				        for (puntero = 1; puntero < stockActual.size() && puntero < 11; puntero++) {
				            this.cajaCantidad.addItem(puntero * 5);  
				        }
				    }
				    
				    // Forzar una actualización visual inicial si se seleccionó un artículo automáticamente
				    if (this.cajaArticulo.getItemCount() == 0) {
				        this.cajaCantidadActual.setText("Elija Artículo!");
				    }
				});

				// Configuración de componentes visuales en el constructor/método de inicialización
				this.cajaArticulo.setBounds(480, 130, 200, 20);  
				add(this.cajaArticulo);

				this.cajaCantidad.setBounds(480, 170, 200, 20);  
				add(this.cajaCantidad);

				this.cajaCantidadActual.setBounds(520, 210,200,20);   add(this.cajaCantidadActual);
			}
		}
}