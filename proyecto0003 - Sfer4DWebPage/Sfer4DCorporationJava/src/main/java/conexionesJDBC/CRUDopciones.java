package conexionesJDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.swing.JOptionPane;

class CRUDopciones
{
	private String opciones="";
	private int selector;
	
	public CRUDopciones(String opciones)
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
	public void selectorCRUD()
	{
		switch(this.selector)
		{
			case 1:   //INVITADO
			{		  //SOLO PODRA VER LA TABLA DE STOCK DISPONIBLE Y CALCULAR PRESUPUESTOS
				//CARGA LA INTERFAZ DE LA TABLA DE STOCK, NO MODIFICA, NI AGREGA NI ELIMINA DATOS DE LA BBDD
				MarcoInsertar insertar= new MarcoInsertar();
				break;
			}
			case 2:  //CLIENTE
			{		 //PODRA VER LA TABLA DE STOCK DISPONIBLE, CALCULAR PRESUPUESTOS Y EN ELLA PEDIR (AGREGAR A LA BBDD)
					 //CARGA LA BBDD, PUEDE MODIFICAR, AGREGAR, PERO NO ELIMINAR DATOS DE LA BBDD
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
						//Si se ha terminado la operación se cierra todo como buena practica
						myst.close();  //Liberar los recursos que se usaban en memoria
						conector.close();  //Liberar el conector que se establecio
						
						JOptionPane.showMessageDialog(null, "INFORMACIÓN ACTUALIZADA");
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
						Connection conector= DriverManager.getConnection("jdbc:mysql://localhost:3306/pruebasdef","root","1234");
						
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