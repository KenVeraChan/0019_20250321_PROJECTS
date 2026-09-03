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
			case "INSERTAR":{this.selector=1;break;}
			case "ELIMINAR":{this.selector=2;break;}
			case "ACTUALIZAR":{this.selector=3;break;}
			case "EXTRAER":{this.selector=4;break;}
		}
	}
	public String getOpciones() {
		return opciones;
	}
	public void setOpciones(String opciones) {
		this.opciones = opciones;
	}
	public void selectorCRUD()
	{
		switch(this.selector)
		{
			case 1:   //INSERTAR ELEMENTOS EN LA BASE DE DATOS
			{		  //PARA INSERTAR SE HARAN TODOS LOS CAMPOS PERO SI ALGUNO ESTA VACIO SE MODIFICA LA CONSULTA
				//CARGA LA INTERFAZ DE USUARIO Y CARGA BASE DE DATOS DE STOCK DE PRDUCTOS (CONSULTAS PARA MOSTRAR NO MODIFICAR)
				MarcoInsertar insertar= new MarcoInsertar();
				break;
			}
			case 2:  //ELIMINAR UN ELEMENTO DE LA BBDD
			{
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
			{
				break;
			}
			case 4:  //EXTRAER UN ELEMENTO DE LA BBDD
			{
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
}