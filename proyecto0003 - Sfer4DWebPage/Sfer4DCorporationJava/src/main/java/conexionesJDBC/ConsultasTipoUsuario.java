package conexionesJDBC;						//// PORTAL DE: INVITADO, CLIENTE, ADMINISTRACION Y JEFE ////

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
		this.user=usuario;               //SE ACTUALIZA EL DATO RECIBIDO DE USUARIO COMPROBANDOSE QUE LLEGO BIEN Y NO ES NULL
		this.password=contrasenia;   //SE ACTUALIZA EL DATO RECIBIDO DE PASSWORD COMPROBANDOS QUE LLEGO BIEN Y NO ES NULL
		
		switch(this.selector)
		{
			case 1:   //INVITADO
			{		  //SOLO PODRA VER LA TABLA DE STOCK DISPONIBLE Y CALCULAR PRESUPUESTOS
				//CARGA LA INTERFAZ DE LA TABLA DE STOCK, NO MODIFICA, NI AGREGA NI ELIMINA DATOS DE LA BBDD
				MarcoBaseOp insertar= new MarcoBaseOp(false);
				break;
			}
			case 2:  //CLIENTE
			{		 //PODRA VER LA TABLA DE STOCK DISPONIBLE, CALCULAR PRESUPUESTOS Y EN ELLA PEDIR (AGREGAR A LA BBDD)
					 //CARGA LA BBDD, PUEDE MODIFICAR, AGREGAR, PERO NO ELIMINAR DATOS DE LA BBDD
					 if(usuario.equals("") || contrasenia.equals(""))
					 {			//NO SE HA CONECTADO EL USUARIO
						 JOptionPane.showInternalMessageDialog(null, "USUARIO O CONTRASEÑA INCORRECTOS", "Estado: Acceso Denegado",  JOptionPane.OK_OPTION);
						 System.exit(0);  //Se sale de la aplicacion
					 }
					 else
					 {			//SE HA CONTECTADO EL USUARIO
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
								MarcoBaseOp insertar= new MarcoBaseOp(clienteLogin,true);
							} else {
							    // Login incorrecto
								 JOptionPane.showInternalMessageDialog(null, "EL USUARIO NO EXISTE EN LA BASE DE DATOS", "Estado: Acceso Denegado",  JOptionPane.OK_OPTION);
								//5) SI SE HA TERMINADO LA OPERACION DE LOGIN SE CIERRA COMO BUENA PRACTICA
								ejecutaConsulta.close();  //Liberar los recursos que se usaban en memoria
								conector.close();  //Liberar el conector que se establecio
								System.exit(0);  //Se sale de la aplicacion
							}
						} catch (SQLException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					 }
				break;
			}
			case 3:  //ADMINSITRACION 
			{		
				//1) SE COMPRUEBA SU EXISTENCIA COMO USUARIO DE ADMINSITRACION
				 if(usuario.equals("") || contrasenia.equals(""))
				 {			//NO SE HA CONECTADO EL USUARIO
					 JOptionPane.showInternalMessageDialog(null, "USUARIO O CONTRASEÑA INCORRECTOS DE ADMINISTACION", "Estado: Acceso Denegado al sector Administrativo",  JOptionPane.OK_OPTION);
					 System.exit(0);  //Se sale de la aplicacion
				 }
				 else
				 {			//SE HA CONTECTADO EL USUARIO DE ADMINISTRACION
					try {
						//1) CREAR CONEXION
						//EN EL CASO DE USO DE MYSQL SE EJECUTA LA CONEXION
						Connection conector= DriverManager.getConnection("jdbc:mysql://localhost:3307/bbdd001_jefes_rrhh","root","1234");
						
						//2) SE PREPARA LA CONSULTA SENSIBLE CON DATOS PERSONALES: USUARIO Y PASSWORD DE LA TABLA: loginclientes
						String consulta = "SELECT * FROM login WHERE USUARIO = ? AND CONTRASENIA = ?";

						//3) SE ESTABLECE LA CONSULTA PARA VERIFICAR EL LOGGEADO
						PreparedStatement cohesion = conector.prepareStatement(consulta);
							//SE DECLARAN LAS VARIALES DE ENTRADA AL USUARIO CLIENTE
						cohesion.setString(1, this.user);
						cohesion.setString(2, this.password);
						
						//4) SE COMPRUEBA LA VERACIDAD DE LAS CREDENCIALES INTRODUCIDAS EJECUTANDO LA CONSULTA
						ResultSet ejecutaConsulta = cohesion.executeQuery();

						if (ejecutaConsulta.next()) {
						    // Login correcto porque con el metodo next() podemos saber si el siguiente elemento esta vacio o no y si no lo esta es que 
							 JOptionPane.showInternalMessageDialog(null, "ADMINISTADOR: "+this.user+" EN SERVICIO", "ESTADO: online", JOptionPane.INFORMATION_MESSAGE);
							//AHORA PROCEDEMOS A LEER LOS DATOS DEL PUNTERO RESULTSET GUARDANDOLOS EN UN OBJETO DE TIPO: ClienteRegistrado
							 AdministradorDatos clienteLogin= new AdministradorDatos(     //La contrasenia no se puede guardar en un objeto
									 ejecutaConsulta.getInt(1),      //RECOGE EL ID
									 ejecutaConsulta.getString(3),   //RECOGE EL NOMBRE
									 ejecutaConsulta.getString(4),   //RECOGE EL ROL DEL USUARIO ADMINISTRACION
									 ejecutaConsulta.getString(5)    //RECOGE EL DEPARTAMENTO AL QUE PERTENECE
									 );
							//5) SI SE HA TERMINADO LA OPERACION DE LOGIN SE CIERRA COMO BUENA PRACTICA
							ejecutaConsulta.close();  //Liberar los recursos que se usaban en memoria
							conector.close();  //Liberar el conector que se establecio
							
							//6) SE INICIA LA ETAPA DEL PANEL DE CONTROL DEL USUARIO ADMINISTRATIVO
									
							MarcoBaseOp insertar= new MarcoBaseOp(clienteLogin,true);
						} else {
						    // Login incorrecto
							 JOptionPane.showInternalMessageDialog(null, "EL USUARIO NO EXISTE EN LA BASE DE DATOS", "Estado: Acceso Denegado",  JOptionPane.OK_OPTION);
							//5) SI SE HA TERMINADO LA OPERACION DE LOGIN SE CIERRA COMO BUENA PRACTICA
							ejecutaConsulta.close();  //Liberar los recursos que se usaban en memoria
							conector.close();  //Liberar el conector que se establecio
							System.exit(0);  //Se sale de la aplicacion
						}
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				 }
				
				
				
					
				
					//	1.1. Gestión de Ventas y Pedidos
					//  - Procesamiento de Pedidos: Recepción, preparación, cambio de estados
				    //		(Pendiente, En Preparación, Enviado, Entregado) y cancelaciones.
				  	//	- Facturación y Cobros: Emisión de facturas electrónicas, albaranes,
				    //		registro de pagos manuales/transferencias y tramitación de devoluciones.
				  	//  - Atención al Cliente: Gestión de tickets de soporte, resolución de
				    //		incidencias con envíos y asignación de cupones de descuento directos.
				 JOptionPane.showInternalMessageDialog(null, "ENTRADO EN ADMINISTRACION", "Estado: Acceso Denegado",  JOptionPane.OK_OPTION);
				
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