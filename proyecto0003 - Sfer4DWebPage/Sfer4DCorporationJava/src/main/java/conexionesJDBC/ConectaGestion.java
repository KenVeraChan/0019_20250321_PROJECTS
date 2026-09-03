package conexionesJDBC;

import java.sql.*;

import javax.swing.JOptionPane;

public class ConectaGestion {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		CRUDopciones selector= new CRUDopciones("INSERTAR");
		selector.selectorCRUD();
  }
}