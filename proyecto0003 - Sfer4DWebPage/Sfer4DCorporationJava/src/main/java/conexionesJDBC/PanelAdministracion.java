package conexionesJDBC;                //// ZONA: ADMINISTRACION  ////

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

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
	public PanelModificar(AdministradorDatos clienteLogin,Boolean habilitadorCliente)
	{
		//PANEL DEL ADMINISTRADOR
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		
	}
}