package conexionesJDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import javax.crypto.SecretKey;
import javax.swing.JComboBox;
import javax.swing.JOptionPane;


public class PanelProcesamientoStock {

	private HashMap<Integer,ObjetoVenta> stock= new HashMap<>();    //Siempre se debera declarar para evitar errores de NULL
	private int puntero=1;   //Clave que aumentara en el input del HashMap

	public PanelProcesamientoStock()
	{
		//No hace nada
	}
	public HashMap<Integer,ObjetoVenta> getMapaDatosStock()
	{
		try {
			//1 - CREAR CONEXION
			//En el caso de MYSQL
			Connection conector= DriverManager.getConnection("jdbc:mysql://localhost:3307/bbdd003_clientes","root","1234");
			
			//2 - CREAR EL STATENMENT
			Statement myst = conector.createStatement();
			
			//3 - EJECUTAR PETICION O CONSULTA SQL: se guardara una tabla virtual dentro de "myrs"
			ResultSet myrs= myst.executeQuery("SELECT * FROM imagenesinterfazweb");
			
			//4 - LEER EL ResultSet
			while(myrs.next())
			{
				//Devuelve los codigos de los articulos
				//Como los productos están agrupados por ID (clave) para apuntar a un objeto (VALOR) se usara HASHMAP
				stock.put(myrs.getInt("ID"), new ObjetoVenta(     //Guardando en el HASHMAP: OJO no por int columna sino por cabecera de la columna
							myrs.getInt("ID"),    		 //OBTIENE EL ID (SOLO LECTURA NO SE MODIFICARA SU VALOR NUNCA)
							myrs.getString("NOMBRE"),    //OBTIENE EL NOMBRE
							myrs.getString("DESTINO"),   //OBTIENE EL DESTINO
							myrs.getString("SECTOR"),    //OBTIENE EL SECTOR
							myrs.getInt("STOCK"),        //OBTIENE EL STOCK
							myrs.getDouble("COSTE"),     //OBTIENE EL COSTE
							myrs.getString("DETALLES"))  //OBTIENE LOS DETALLES
						);
				this.puntero++;
			}
			//Si se ha terminado la operación se cierra todo como buena practica
			myrs.close();  //Liberar los recursos que se usaban en memoria
			conector.close();  //Liberar el conector que se establecio
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return this.stock;     //Devuelve el STOCK de ventas planteadas desde la direccion de la empresa
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class ObjetoVenta
{
	private int ID;			   //OBTIENE EL ID (SOLO LECTURA NO SE MODIFICARA SU VALOR NUNCA)
	private String nombre;     //Nombre del producto-servicio-proyecto
	private String destino;    //Clasificacion: PRODUCTO, SERVICIO, PROYECTO
	private String sector;     //Subclasificacion dentro de: PRODUCTO, SERVICIO, PROYECTO
	private int cantidad;      //Numero de unidades existentes en el STOCK
	private double coste;      //Coste unitario decimal
	private String detalles;   //Breve descripcion del articulo de venta
	
	private static int numProductos=0;   //Contabiliza el numero de PRODUCTOS que se registran
	private static int numServicios=0;   //Contabiliza el numero de SERVICIOS que se registran
	private static int numProyectos=0;   //Contabiliza el numero de PROYECTOS que se registran
	
	public ObjetoVenta(int ID,String nombre,String destino,String sector,int cantidad,double coste,String detalles)
	{
		this.ID=ID;
		this.nombre=nombre;
			if("PRODUCTOS".equals(destino.trim())){numProductos++;}
			if("SERVICIOS".equals(destino.trim())){numServicios++;}
			if("PROYECTOS".equals(destino.trim())){numProyectos++;}
		this.destino=destino;
		this.sector=sector;
		this.cantidad=cantidad;
		this.coste=coste;
		this.detalles=detalles;
	}

	public int getID() {
		return ID;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getDestino() {
		return destino;
	}
	public void setDestino(String destino) {
		this.destino = destino;
	}
	public String getSector() {
		return sector;
	}
	public void setSector(String sector) {
		this.sector = sector;
	}
	public int getCantidad() {
		return cantidad;
	}
	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}
	public double getCoste() {
		return coste;
	}
	public void setCoste(double coste) {
		this.coste = coste;
	}
	public String getDetalles() {
		return detalles;
	}
	public void setDetalles(String detalles) {
		this.detalles = detalles;
	}
	public static int getNumProductos()
	{
		return numProductos;
	}
	public static int getNumServicios()
	{
		return numServicios;
	}
	public static int getNumProyectos()
	{
		return numProyectos;
	}
	public static int mayorDeTresRegistros(int productos, int servicios, int proyectos) {
	    int mayor = productos;   //Declarando un pivote
	    if (servicios > mayor) mayor = servicios;
	    if (proyectos > mayor) mayor = proyectos;
	    return mayor;
	}
	public static void reiniciarVariablesEstaticas()
	{
		numProductos=0;   //Contabiliza el numero de PRODUCTOS que se registran
		numServicios=0;   //Contabiliza el numero de SERVICIOS que se registran
		numProyectos=0;   //Contabiliza el numero de PROYECTOS que se registran
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class CarritoCompra
{
	private String nombreVenta;
	private String destinoVenta;
	private String sectorVenta;
	private int cantidadVenta;
	private double costeVenta;
	private double totalVenta;
	private static HashMap<Integer,CarritoCompra> compras=new HashMap<>();
	private int opcionCompra;  //Se activa la opcion compra o no
	
	public CarritoCompra(String nombreVenta, String destinoVenta,String sectorVenta,int cantidadVenta,double costeVenta)
	{
		this.nombreVenta=nombreVenta;
		this.destinoVenta=destinoVenta;
		this.sectorVenta=sectorVenta;
		this.cantidadVenta=cantidadVenta;
		this.costeVenta=costeVenta;
		this.totalVenta=totalVenta;
	}
	public static void getMapaCompras(HashMap<Integer,ObjetoVenta> mapaStock,JComboBox<Integer> elecciones)
	{		
		//RECOPILADO DE DATOS:
			String nombreVenta=mapaStock.get(Integer
									 .parseInt(elecciones
									 .getActionCommand()
									 .substring(8)))
									 .getNombre()
									 	.substring(0,
									 			mapaStock.get(Integer
									 					 .parseInt(elecciones
									    				 .getActionCommand()
									    				 .substring(8)))
					 				    				 .getNombre()
									 					 .length()-4);
			String destinoVenta=mapaStock.get(Integer.parseInt(elecciones.getActionCommand().substring(8))).getDestino();
			String sectorVenta=mapaStock.get(Integer.parseInt(elecciones.getActionCommand().substring(8))).getSector();
			int cantidadVenta=elecciones.getSelectedIndex();
			double costeVenta=mapaStock.get(Integer.parseInt(elecciones.getActionCommand().substring(8))).getCoste();
			
		//CONSTRUYENDO EL OBJETO QUE SE USARA
			CarritoCompra elementoElegido=new CarritoCompra(nombreVenta,destinoVenta,sectorVenta,cantidadVenta,costeVenta);
		
		//SE GUARDA EL OBJETO Y LA CLAVE DENTRO DE UN PUT PARA QUE NO SE REPITAN LAS CLAVES Y SE SOBREESCRIBA
			compras.put(Integer.parseInt(elecciones.getActionCommand().substring(8)),elementoElegido);
	}
	public static int getMapaCarro(Boolean InvitadoCliente)
	{
		//SE CALCULA EL COSTE TOTAL DE TODA LA SUPUESTA COMPRA DE TODOS LOS ARTICULOS
		final double[] costeTotal = {0.0};   //Funciona porque el array es final, pero su contenido no.
		compras.forEach((clave, valor) -> {
		    costeTotal[0] += valor.cantidadVenta * valor.costeVenta;
		});
	
		//SE IMPRIME EL CONJUNTO COMPLETO EN UNA TABLA DENTRO DEL JOPTIONPANE ON MODO HTML
		StringBuilder html = new StringBuilder();

		html.append("<html><div align='center'>");
		html.append("<table border='1' cellpadding='4' cellspacing='0'>");
		html.append("<tr><th>VENTA</th><th>DESTINO</th><th>SECTOR</th><th>CANTIDAD</th><th>COSTE</th><th>TOTAL</th></tr>");

		compras.forEach((clave, valor) -> {
		    if(valor.cantidadVenta==0)
		    {
		    	//NO HACE NADA PORQUE EL ARTICULO TIENE CANTIDAD CERO
		    }
		    else
		    {
				html.append("<tr>");
			    html.append("<td>").append(valor.nombreVenta).append("</td>");
			    html.append("<td>").append(valor.destinoVenta).append("</td>");
			    html.append("<td>").append(valor.sectorVenta).append("</td>");
			    html.append("<td>").append(valor.cantidadVenta).append("</td>");
			    html.append("<td>").append(String.format("%.2f",valor.costeVenta)+"€").append("</td>");
			    html.append("<td>").append(String.format("%.2f",valor.cantidadVenta*valor.costeVenta)+"€").append("</td>");
			    html.append("</tr>");
		    }
		});
	    html.append("<tr>");
	    html.append("<td colspan=2>").append("COSTE TOTAL: ").append("</td>");
	    html.append("<td colspan=4>").append(String.format("%.3f",costeTotal[0])+"€").append("</td>");
	    html.append("</tr>");
		html.append("</table>");
		
		if(InvitadoCliente)
		{
			//EN EL CASO DE QUE SEA UN CLIENTE: Se habilita la opcion de compra
			html.append("<div><strong>¿Desea realizar la compra de todo el carrito?</strong></div>");
			html.append("</html>");
			int opcionCompra=JOptionPane.showConfirmDialog(null, html.toString(), "Carrito de la compra", JOptionPane.YES_NO_OPTION);
			return opcionCompra;     //Aqui puede elegir en si comprar o no por eso se le da ambas opciones
		}
		else
		{
			//EN EL CASO DE QUE NO SEA UN CLIENTE SINO UN INVITADO: Se deshabilita la opcion de compra
			html.append("</html>");
			JOptionPane.showMessageDialog(null, html.toString(), "Carrito de compra", JOptionPane.INFORMATION_MESSAGE);
			return JOptionPane.NO_OPTION;
		}
		
	}
	public static HashMap<Integer,CarritoCompra> getMapaCompras()
	{
		return compras;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class CompraEjecutada
{
	private HashMap<Integer,CarritoCompra> carritoCompra;             //CARRITO COMPRA CLIENTE
	private ClienteRegistrado clienteLogin;							  //CLIENTE REGISTRADO
	private HashMap<Integer,ObjetoVenta> stock;                       //STOCK TOTAL EMPRESA
	private ArrayList<DatosBancariosCliente> datosBancariosClientes;  //DATOS BANCARIOS PAGO
	
	public CompraEjecutada(ClienteRegistrado clienteLogin,HashMap<Integer,ObjetoVenta> stock)
	{		
		//PRIMERO RECEPCION DE DATOS EXISTENTES
		this.clienteLogin=clienteLogin;  					  //CLIENTE REGISTRADO (bbdd003_clientes ---> Tabla: loginclientes
		this.stock=stock;                					  //STOCK EXISTENTE    (bbdd003_clientes ---> Tabla: imagenesinterfazweb
		this.carritoCompra=CarritoCompra.getMapaCompras();	  //CLIENTE COMPRANDO  (bbdd003_clientes ---> Tabla: clientescarrito
		
		//SEGUNDO DESCARGA DE DATOS DE LA TABLA DATOSBANCARIOS (CUIDADO ESTA ZONA EN LAS CONSULTAS SQL) PARA DETECTAR TARJETA BANCARIA Y REALZIAR COMPRA
		this.datosBancariosClientes= new DatosBancariosCliente().getDatosBancariosCliente();
		
		//TERCERO SE DEBE MODIFICAR LAS BASES DE DATOS 
	
		//Servidor: mysql
		//Base de datos: bbdd003_clientes
		//Tabla: clientescarrito
		//Columnas: ID, NOMBRE, DEPARTAMENTO, CANTIDAD, COSTE_UNITARIO, COSTE_TOTAL
		//Comentarios: No se modifica desde esta aplicacion de Escritorio eso en WEB
		
		//Servidor: mysql
		//Base de datos: bbdd003_clientes
		//Columnas: NOMBRE, NUMERO CUENTA, MES, ANIO
		//Comentarios: Se comprueba antes que exista una tarjeta de crédito para ejecutar la compra
		
		for (DatosBancariosCliente cliente : this.datosBancariosClientes)
		{
		    // 1. Se busca si coincide el nombre del cliente loggeado
		    if (cliente.getNombreCliente().equals(this.clienteLogin.getUsuario()))
		    {
		        // 2. Se busca si se valida la tarjeta (descifra internamente)
		        boolean tarjetaValida = cliente.validarTarjeta(cliente.getNumeroCuentaCliente());

		        if (tarjetaValida)
		        {
					JOptionPane.showMessageDialog(null, "TARJETA VÁLIDA. SE PUEDE EJECUTAR LA COMPRA.", "PROCESO COMPRA CONFIRMADA", JOptionPane.INFORMATION_MESSAGE);
		            // Aquí ya puedes continuar con la compra
		        }
		        else
		        {
					JOptionPane.showMessageDialog(null, "ERROR: TARJETA NO VÁLIDA. COMPRA BLOQUEADA.", "PROCESO COMPRA INTERRUMPIDO", JOptionPane.WARNING_MESSAGE);
		        }
		    }
		    else
		    {
				JOptionPane.showMessageDialog(null, "USUARIO NO REGISTRADO O NO SE HA ENCONTRADO ", "PROCESO COMPRA INTERRUMPIDO", JOptionPane.WARNING_MESSAGE);
		    }
		}
	
		
		//Servidor: mysql
		//Base de datos: bbdd003_clientes
		//Tabla: clientespedidos
		//Comentarios: Si se modifica porque se ha generado un nuevo pedido y se AÑADE un nuevo pedido
			
		
				// Recorre cada elemento del HashMap
				// Sustituye los datos de la tabla por los del mapa
				// Usa PreparedStatement → seguro, sin inyección SQL
				// Actualiza solo las filas que existen (por ID)
				
				//String sql = "UPDATE stock SET nombre=?, cantidad=?, precio=? WHERE id=?";
			/*
				try (PreparedStatement ps = conexion.prepareStatement(sql)) {
		
				    mapaStock.forEach((id, objeto) -> {
				        try {
				            ps.setString(1, objeto.getNombre());
				            ps.setInt(2, objeto.getCantidad());
				            ps.setDouble(3, objeto.getPrecio());
				            ps.setInt(4, id);
				            ps.executeUpdate();
				        } catch (Exception e) {
				            e.printStackTrace();
				        }
				    });
		
				} catch (Exception e) {
				    e.printStackTrace();
				}
		 	*/
		

			//Servidor: mysql
			//Base de datos: bbdd003_clientes
			//Tabla: imagenesinterfazweb
			//Comentarios: Si se modifica despues para ACTUALIZAR el STOCK de los articulos comprados
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class DatosBancariosCliente
{
	private String nombreCliente;
	private String numeroCuentaCliente;
	private int mesTarjeta;
	private int anioTarjeta;
	private ArrayList<DatosBancariosCliente> datosBancarios= new ArrayList<DatosBancariosCliente>();
	
	private SecretKey claveAES;      // Clave que cifrará el numero de la cuenta bancaria del usuario
	private String pan = "";      // Cadena de prueba para el cifrado
	private String cifrado="";    // Cadena cifrada posterior
	private String descifrado;    // Cadena descifrada posterior
	
	public DatosBancariosCliente()
	{
		//CONSTRUCTOR QUE NO HACE NADA PARA EL CASO DE SOLO INVOCAR LOS MÉTODOS INTERNOS SIN INSTANCIAR EL OBJETO
	    try {
	        this.claveAES = SeguridadAES.cargarClaveAES();   // Clave cargada también aquí
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	}
	public DatosBancariosCliente(String nombreCliente,String numeroCuentaCliente, int mesTarjeta, int anioTarjeta)
	{
		this.nombreCliente=nombreCliente;
		this.numeroCuentaCliente= numeroCuentaCliente;
		this.mesTarjeta=mesTarjeta;
		this.anioTarjeta=anioTarjeta;
	    try {
	        this.claveAES = SeguridadAES.cargarClaveAES();   // Clave cargada para cada objeto
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	}
	public ArrayList<DatosBancariosCliente> getDatosBancariosCliente()
	{
		//1 - SE CARGA LA CLAVE CIFRADA QUE SE USARÁ PARA ENCRIPTAR LA LECTURA DE LA CUENTA BANCARIA DE LA BBDD
		//GENERANDO LA CLAVE NCRIPTADA POR CADA USUARIO CLIENTE REGISTRADO, CADA CLIENTE TENDRA UNA DIFERENTE
				try {
					this.claveAES = SeguridadAES.cargarClaveAES();
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}  // clave ya cargada
		try {
			//2 - CREAR CONEXION
			//En el caso de MYSQL
			Connection conector= DriverManager.getConnection("jdbc:mysql://localhost:3307/bbdd003_clientes","root","1234");
			
			//3 - CREAR EL STATENMENT
			Statement myst = conector.createStatement();
			
			//4 - EJECUTAR PETICION O CONSULTA SQL: se guardara una tabla virtual dentro de "myrs"
			ResultSet myrs= myst.executeQuery("SELECT * FROM datosbancarios");
			
			//5 - LEER EL ResultSet
			while(myrs.next())
			{
				try {    //APLICANDO LA ENCRIPTACION PREVIAMENTE ANTES DE METERLA EN EL OBJETO
					this.cifrado = SeguridadAES.cifrar(myrs.getString("NUMERO"), this.claveAES);
						//Devuelve los codigos de los articulos
						//Como los productos están agrupados por ID (clave) para apuntar a un objeto (VALOR) se usara HASHMAP
						this.datosBancarios.add(new DatosBancariosCliente(     //Guardando en el HASHMAP: OJO no por int columna sino por cabecera de la columna
									myrs.getString("NOMBRE"),    //OBTIENE EL ID (SOLO LECTURA NO SE MODIFICARA SU VALOR NUNCA)
									this.cifrado,    			 //OBTIENE EL NUMERO CUENTA BANCARIA (PREVIAMENTE ENCRIPTADO)
									myrs.getInt("MES"),          //OBTIENE EL MES FECHA CADUCIDAD TARJETA
									myrs.getInt("ANIO")			 //OBTIENE EL ANIO FECHA CADUCIDAD TARJETA
							)); 
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
			}
			//6 - Si se ha terminado la operación se cierra todo como buena practica
			myrs.close();  //Liberar los recursos que se usaban en memoria
			conector.close();  //Liberar el conector que se establecio
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return this.datosBancarios;     //Devuelve el STOCK de ventas planteadas desde la direccion de la empresa
	}
	public String getNombreCliente() {
		return nombreCliente;
	}
	public void setNombreCliente(String nombreCliente) {
		this.nombreCliente = nombreCliente;
	}
	public String getNumeroCuentaCliente() {     //Devolucion del desencriptado PAN (Primary Account Number)
	    return this.numeroCuentaCliente;   // devuelve el PAN cifrado
	}
	public boolean validarTarjeta(String PANencriptado) {
		//1 - PRIMERO PARA VALIDAR EL PAN INTRODUCIDO SE DEBE DESENCRIPTAR
		try {    //APLICANDO LA DESENCRIPTACION
			this.descifrado = SeguridadAES.descifrar(PANencriptado, claveAES);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//2 - LUEGO SE APLICA LA VALIDEZ DEL PAN DETECTADO Y DESENCRIPTADO
	    if (this.descifrado == null) return false;
		    // Elimina espacios en blanco al inicio y final
		    this.descifrado = this.descifrado.trim();
		    // Expresión regular:
		    // 4 dígitos + separador + 4 dígitos + separador + 4 dígitos + separador + 4 dígitos
		    // Separador permitido: espacio o guion
		    	String regex = "^[0-9]{4}([ -])[0-9]{4}\\1[0-9]{4}\\1[0-9]{4}$";
	    return this.descifrado.matches(regex);
	}
	public void setNumeroCuentaCliente(String numeroCuentaCliente) {
		this.numeroCuentaCliente = numeroCuentaCliente;
	}
	public int getMesTarjeta() {
		return mesTarjeta;
	}
	public void setMesTarjeta(int mesTarjeta) {
		this.mesTarjeta = mesTarjeta;
	}
	public int getAnioTarjeta() {
		return anioTarjeta;
	}
	public void setAnioTarjeta(int anioTarjeta) {
		this.anioTarjeta = anioTarjeta;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class MovimientoStockBBDD
{
	public MovimientoStockBBDD()
	{
		
	}
}

