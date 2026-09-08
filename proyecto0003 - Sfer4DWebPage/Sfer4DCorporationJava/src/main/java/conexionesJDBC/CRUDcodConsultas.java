package conexionesJDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;

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
				stock.put(this.puntero, new ObjetoVenta(     //Guardando en el HASHMAP
							myrs.getInt(1),    //OBTIENE EL ID (SOLO LECTURA NO SE MODIFICARA SU VALOR NUNCA)
							myrs.getString(2),    //OBTIENE EL NOMBRE
							myrs.getString(5),    //OBTIENE EL DESTINO
							myrs.getString(6),    //OBTIENE EL SECTOR
							myrs.getInt(7),       //OBTIENE EL STOCK
							myrs.getDouble(8),    //OBTIENE EL COSTE
							myrs.getString(9))    //OBTIENE LOS DETALLES
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
