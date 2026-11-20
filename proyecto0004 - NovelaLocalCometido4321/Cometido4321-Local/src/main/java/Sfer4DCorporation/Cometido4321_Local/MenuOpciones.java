package Sfer4DCorporation.Cometido4321_Local;

import java.awt.AlphaComposite;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Path;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class MenuOpciones {
	CuadroOpciones base= new CuadroOpciones();
	
}

class CuadroOpciones extends JFrame
{	
	public CuadroOpciones()
	{
		setBounds(300,100,650,400);
		setTitle("BIENVENIDO AL EDITOR NOVELA");
		setIconImage(new ImageIcon("ficherosUtilizados/icono.png").getImage());
		setResizable(false);
		PanelHallNovela almacen = new PanelHallNovela("ficherosUtilizados/cometido4321.jpeg", 30,this);
		add(almacen);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setVisible(true);
	}
}

class PanelHallNovela extends JPanel implements ActionListener
{
	//1) DECLARACION DE ELEMENTOS USADOS EN LA INTERFAZ
	private BufferedImage imagen;
    private float alfaImagen = 1.0f; // opaco por defecto
    
	public PanelHallNovela(String ruta,int transparencia,JFrame tableroBase)
	{
	    //1) TRATAMIENTO DE FONDO LAMINA /////////////////////
        try {
            if (ruta.startsWith("http")) {
                // URL remota
            	Path path = Path.of(ruta);
            	this.imagen = ImageIO.read(path.toFile());
            }
            else if (ruta.startsWith("file:/")) {
                // URL local absoluta
            	Path path = Path.of(ruta);
            	this.imagen = ImageIO.read(path.toFile());
            }
            else {
               // Ruta local normal (MI CASO)
                File archivo = new File(ruta);
                this.imagen = ImageIO.read(archivo);
            }
            // transparencia de 0 a 100 → alpha de 0.0 a 1.0
            this.alfaImagen = Math.max(0, Math.min(100, transparencia)) / 100f;
        } catch (Exception e) {
            e.printStackTrace();
        }	
	    //3) ESTETICA DE CAJAS-TITULOS-DESPLEGABLES-FECHAS
		setLayout(null);  //Para que respeten el setBounds
	}
	
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        if (this.imagen != null) {
            Graphics2D g2 = (Graphics2D) g.create();
            g2.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, this.alfaImagen));
            g2.drawImage(imagen, 0, 0, getWidth(), getHeight(), this);
            g2.dispose();
        }
    }
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		
	}
}


