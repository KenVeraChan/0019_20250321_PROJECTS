package conexionesJDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.swing.JOptionPane;

class ConsultasTipoUsuario
{
	private String opciones="";
	private int selector;
	private String user="";      //VARIABLES QUE SERVIRAN PARA 
	private String password="";  //CLIENTE, ADMINISTRADOR Y JEFES
	
	public ConsultasTipoUsuario(String opciones)
	{
		this.opciones=opciones;
		switch(opciones)
		{
			case "INVITADO":{this.selector=1;break;}          //ENTRADA A USUARIO INVITADO SIN REGISTRO
			case "CLIENTE":{this.selector=2;break;}           //ENTRADA A USUARIO REGISTRADO 
			case "ADMINISTRACION":{this.selector=3;break;}    //ENTRADA A EMPRESA ADMINISTRATIVA
			case "JEFES":{this.selector=4;break;}             //ENTRADA A DIRECTIVOS
		}
	}
	public void selectorCRUD(String usuario,String contrasenia)    //AVISO: Estos datos no deberan estar expuestos en codigo fuente
	{
		this.user=usuario == null?"":usuario;               //SE ACTUALIZA EL DATO RECIBIDO DE USUARIO COMPROBANDOSE QUE LLEGO BIEN Y NO ES NULL
		this.password=contrasenia == null?"":contrasenia;   //SE ACTUALIZA EL DATO RECIBIDO DE PASSWORD COMPROBANDOS QUE LLEGO BIEN Y NO ES NULL
		
		switch(this.selector)
		{
			case 1:   //INVITADO
			{		  //SOLO PODRA VER LA TABLA DE STOCK DISPONIBLE Y CALCULAR PRESUPUESTOS
				//CARGA LA INTERFAZ DE LA TABLA DE STOCK, NO MODIFICA, NI AGREGA NI ELIMINA DATOS DE LA BBDD
				MarcoBaseOp insertar= new MarcoBaseOp();
				break;
			}
			case 2:  //CLIENTE
			{		 //PODRA VER LA TABLA DE STOCK DISPONIBLE, CALCULAR PRESUPUESTOS Y EN ELLA PEDIR (AGREGAR A LA BBDD)
					 //CARGA LA BBDD, PUEDE MODIFICAR, AGREGAR, PERO NO ELIMINAR DATOS DE LA BBDD
					try {
						//1) CREAR CONEXION
						//EN EL CASO DE USO DE MYSQL SE EJECUTA LA CONEXION
						Connection conector= DriverManager.getConnection("jdbc:mysql://localhost:3307/bbdd003_clientes","root","1234");
						
						//2) SE PREPARA LA CONSULTA SENSIBLE CON DATOS PERSONALES: USUARIO Y PASSWORD DE LA TABLA: loginclientes
						String consulta = "SELECT * FROM loginclientes WHERE USUARIO = ? AND CONTRASENIA = ?";

						//3) SE ESTABLECE LA CONSULTA PARA VERIFICAR EL LOGGEADO
						PreparedStatement cohesion = conector.prepareStatement(consulta);
							//SE DECLARAN LAS VARIALES DE ENTRADA AL USUARIO CLIENTE
						cohesion.setString(1, this.user);
						cohesion.setString(2, this.password);
						
						//4) SE COMPRUEBA LA VERACIDAD DE LAS CREDENCIALES INTRODUCIDAS EJECUTANDO LA CONSULTA
						ResultSet ejecutaConsulta = cohesion.executeQuery();

						if (ejecutaConsulta.next()) {
						    // Login correcto porque con el metodo next() podemos saber si el siguiente elemento esta vacio o no y si no lo esta es que 
							 JOptionPane.showInternalMessageDialog(null, "CLIENTE: "+this.user+" CONECTADO", "ESTADO: online", JOptionPane.INFORMATION_MESSAGE);
							//AHORA PROCEDEMOS A LEER LOS DATOS DEL PUNTERO RESULTSET GUARDANDOLOS EN UN OBJETO DE TIPO: ClienteRegistrado
							 ClienteRegistrado clienteLogin= new ClienteRegistrado(     //La contrasenia no se puede guardar en un objeto
									 ejecutaConsulta.getInt(1),       //RECOGE EL ID
									 ejecutaConsulta.getString(2),    //RECOGE EL NOMBRE
									 ejecutaConsulta.getLong(4),      //RECOGE EL TELEFONO
									 ejecutaConsulta.getString(5),    //RECOGE LA DIRECCION
									 ejecutaConsulta.getString(6),    //RECOGE LA ENTIDAD
									 ejecutaConsulta.getString(7),    //RECOGE EL CORREO
									 ejecutaConsulta.getString(8),    //RECOGE LA FOTO IDENTIDAD
									 ejecutaConsulta.getInt(9)        //RECOGE EL NUMERO DE COMPRAS REALIZADAS
									 );
							//5) SI SE HA TERMINADO LA OPERACION DE LOGIN SE CIERRA COMO BUENA PRACTICA
							ejecutaConsulta.close();  //Liberar los recursos que se usaban en memoria
							conector.close();  //Liberar el conector que se establecio
							
							//6) SE INICIA LA ETAPA DEL PANEL DE CONTROL DEL USUARIO CLIENTE CON SUS COMPRAS Y EL PROCESO CRUD
							MarcoBaseOp insertar= new MarcoBaseOp(clienteLogin);
						} else {
						    // Login incorrecto
							 JOptionPane.showInternalMessageDialog(null, "USUARIO O CONTRASEÑA INCORRECTOS", "Estado: Acceso Denegado",  JOptionPane.OK_OPTION);
							//5) SI SE HA TERMINADO LA OPERACION DE LOGIN SE CIERRA COMO BUENA PRACTICA
							ejecutaConsulta.close();  //Liberar los recursos que se usaban en memoria
							conector.close();  //Liberar el conector que se establecio
						}
						
						
						//LA CONSULTA A CONTINUACION ES PARA AÑADIR ELEMENTOS

						//2 - CREAR EL STATENMENT
						//Statement myst = conector.createStatement();
						
						//3 - CREAR INSTRUCCIÓN SQL
						//String inSQL="INSERT INTO productos(CODIGOARTICULO,NOMBREARTICULO,PRECIO) VALUES ('AR45','"+producto+"',50)";
		
						//4 - EJECUTAR SQL
						//myst.executeUpdate(inSQL);
						
						//5 - CERRAR LA CONEXION
						//Si se ha terminado la operación se cierra todo como buena practica
						//myst.close();  //Liberar los recursos que se usaban en memoria
						//conector.close();  //Liberar el conector que se establecio
						//JOptionPane.showMessageDialog(null, "INFORMACIÓN ACTUALIZADA");
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				break;
			}
			case 3:  //ACTUALIZAR UN ELEMENTO DE LA BBDD
			{		//CARGA LA BBDD, PUEDE MODIFICAR, NO PUEDE AGREGAR, PERO SI ELIMINAR DATOS DE LA BBDD
			
				break;
			}
			case 4:  //EXTRAER UN ELEMENTO DE LA BBDD
			{        //CARGA LA BBDD, PUEDE MODIFICAR, AGREGAR Y ELIMINAR DATOS DE LA BBDD
					try {
						//1 - CREAR CONEXION
						//En el caso de MYSQL
						Connection conector= DriverManager.getConnection("jdbc:mysql://localhost:3307/bbdd003_clientes","root","1234");
						
						//2 - CREAR EL STATENMENT
						Statement myst = conector.createStatement();
						
						//3 - EJECUTAR PETICION O CONSULTA SQL: se guardara una tabla virtual dentro de "myrs"
						ResultSet myrs= myst.executeQuery("SELECT * FROM productos");
						
						//4 - LEER EL ResultSet
						while(myrs.next())
						{
							//Devuelve los codigos de los articulos
							//No existe columna 0 en MYSQL se empieza siempre por la 1
							System.out.println(myrs.getString(1)+" "+myrs.getString(3));
						}
						//Si se ha terminado la operación se cierra todo como buena practica
						myrs.close();  //Liberar los recursos que se usaban en memoria
						conector.close();  //Liberar el conector que se establecio
						
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				break;
			}
		}
	}
	public String getOpciones() {
		return opciones;
	}
	public void setOpciones(String opciones) {
		this.opciones = opciones;
	}
}

class ClienteRegistrado
{
	private int ID;    //La contrasenia no se puede guardar en un objeto
	private String usuario;
	private long telefono;
	private String direccion;
	private String entidad;     //Tipo de cliente: SOCIO o CASUAL
	private String correo;
	private String fotografia;
	private int compras;
	
	public ClienteRegistrado(int ID,String usuario,long telefono,String direccion,String entidad,String correo,String fotografia, int compras)
	{
		this.ID=ID;
		this.usuario=usuario;
		this.telefono=telefono;
		this.direccion=direccion;
		this.entidad=entidad;
		this.correo=correo;
		this.fotografia=fotografia;
		this.compras=compras;
	}

	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public long getTelefono() {
		return telefono;
	}
	public void setTelefono(long telefono) {
		this.telefono = telefono;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public String getEntidad() {
		return entidad;
	}
	public void setEntidad(String entidad) {
		this.entidad = entidad;
	}
	public String getCorreo() {
		return correo;
	}
	public void setCorreo(String correo) {
		this.correo = correo;
	}
	public String getFotografia() {
		return fotografia;
	}
	public void setFotografia(String fotografia) {
		this.fotografia = fotografia;
	}
	public int getCompras() {
		return compras;
	}
	public void setCompras(int compras) {
		this.compras = compras;
	}
}