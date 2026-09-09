package conexionesJDBC;

import java.sql.*;

import javax.swing.JOptionPane;

public class ConectaGestion {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//CASO 1: MOSTRAR AL USUARIO INVITADO LA TABLA DE STOCK CALCULANDO COSTES TABULADOS SIN PEDIR
		CRUDopciones selector= new CRUDopciones("INVITADO");  
		//CASO 2: MOSTRAR AL USUARIO REGISTRADO LA TABLA DE STOCK Y SUS PEDIDOS
			//CARGAR LOS PEDIDOS Y PODER MODIFICARLOS O ELIMINARLOS
		selector.selectorCRUD();
  }
}