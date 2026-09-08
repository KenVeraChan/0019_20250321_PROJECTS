package conexionesJDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;

import javax.swing.JComboBox;
import javax.swing.JOptionPane;

public class CRUDcodConsultas {

	private HashMap<Integer,ObjetoVenta> stock= new HashMap<>();    //Siempre se debera declarar para evitar errores de NULL
	private int puntero=1;   //Clave que aumentara en el input del HashMap

	public CRUDcodConsultas()
	{
		//No hace nada
	}
	public HashMap<Integer,ObjetoVenta> getMapaDatosStock()
	{
		try {
			//1 - CREAR CONEXION
			//En el caso de MYSQL
			Connection conector= DriverManager.getConnection("jdbc:mysql://localhost:3306/pruebasdef","root","1234");
			
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

class CarritoCompra
{
	private String nombreVenta;
	private String destinoVenta;
	private String sectorVenta;
	private int cantidadVenta;
	private double costeVenta;
	private double totalVenta;
	private static HashMap<Integer,CarritoCompra> compras=new HashMap<>();
	
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
	public static void getMapaCarro()
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
		    html.append("<tr>");
		    html.append("<td>").append(valor.nombreVenta).append("</td>");
		    html.append("<td>").append(valor.destinoVenta).append("</td>");
		    html.append("<td>").append(valor.sectorVenta).append("</td>");
		    html.append("<td>").append(valor.cantidadVenta).append("</td>");
		    html.append("<td>").append(String.format("%.2f",valor.costeVenta)+"€").append("</td>");
		    html.append("<td>").append(String.format("%.2f",valor.cantidadVenta*valor.costeVenta)+"€").append("</td>");
		    html.append("</tr>");
		});
	    html.append("<tr>");
	    html.append("<td colspan=2>").append("COSTE TOTAL: ").append("</td>");
	    html.append("<td colspan=4>").append(String.format("%.3f",costeTotal[0])+"€").append("</td>");
	    html.append("</tr>");
		html.append("</table>");
		html.append("</html>");

		JOptionPane.showMessageDialog(null, html.toString(), "Carrito de compra", JOptionPane.INFORMATION_MESSAGE);
	}
}
