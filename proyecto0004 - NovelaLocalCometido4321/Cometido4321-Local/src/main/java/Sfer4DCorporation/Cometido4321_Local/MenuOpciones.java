package Sfer4DCorporation.Cometido4321_Local;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Path;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

import Sfer4DCorporation_BorradorNovela.BorradorNovela;

class MenuOpciones {
	CuadroOpciones base= new CuadroOpciones();
	
}

class CuadroOpciones extends JFrame
{	
	public CuadroOpciones()
	{
		setBounds(300,100,700,520);
		setTitle("BIENVENIDO AL EDITOR NOVELA");
		setIconImage(new ImageIcon("ficherosUtilizados/icono.png").getImage());
		setResizable(false);
		PanelHallNovela almacen = new PanelHallNovela("ficherosUtilizados/cometido4321.jpeg", 50,this);
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
    
    //2) DECLARACION DE TITULOS DE GRUPOS BOTONERAS
    private JLabel escritoBorrador,escritoNovela,escritoCronologia;
    
    //2) DECLARACION DE BOTONES
    private JButton borradorUnaPagina, borradorVariasPaginas, borradorIntervaloPaginas;   //caso borrador novela
    private JButton novelaUnaPagina, novelaVariasPaginas, novelaIntervaloPaginas;  //caso novela terminada
    private JButton cronologia;     //Para el caso de sacar una cronologia
    
    //3) DECLARACION DE LAS INTERFACES SECUNDARIAS DE LOS MENUS SECUNDARIOS PARA TRATAR VISIBILIDAD INTERFACES
    private BorradorNovela paginaBorrador;
    
    
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
	    //2) ESTETICA DE CAJAS-TITULOS-DESPLEGABLES-FECHAS
			setLayout(null);  //Para que respeten el setBounds
		
		//3) COLOCACION DE JLABELS DE LAS BOTONERAS
			escritoBorrador = new JLabel("MENU DE OPCIONES - BORRADOR NOVELA");
			escritoBorrador.setFont(new Font("Segoe UI", Font.BOLD, 15));
			escritoBorrador.setForeground(new Color(102, 0, 51));
			escritoBorrador.setBounds(30, 30, 450, 30);
		
			escritoNovela = new JLabel("MENU DE OPCIONES - EDICION NOVELA");
			escritoNovela.setFont(new Font("Segoe UI", Font.BOLD, 15));
			escritoNovela.setForeground(new Color(102, 0, 51));
			escritoNovela.setBounds(30, 200, 450, 30);
			
			escritoCronologia = new JLabel("MENU DE OPCIONES - CRONOLOGÍA NOVELA");
			escritoCronologia.setFont(new Font("Segoe UI", Font.BOLD, 15));
			escritoCronologia.setForeground(new Color(102, 0, 51));
			escritoCronologia.setBounds(30, 370, 450, 30);
		
			add(escritoBorrador);
			add(escritoNovela);
			add(escritoCronologia);
			
		//4) COLOCACION DE BOTONES DECLARADOS
			borradorUnaPagina= new JButton("Borrador - Selección de una página");
		    borradorVariasPaginas=new JButton("Borrador - Seleccion de varias páginas");   //caso borrador novela
		    borradorIntervaloPaginas=new JButton("Borrador - Selección intervalo de páginas");
		    novelaUnaPagina= new JButton("Novela - Seleccion de una página");
		    novelaVariasPaginas= new JButton("Novela - Seleccion de varias páginas");
		    novelaIntervaloPaginas=new JButton("Novela - Selección de intervalo de páginas");  //caso novela terminada
		    cronologia= new JButton("Sacar cronología de la Novela");     //Para el caso de sacar una cronologia
		    
		    borradorUnaPagina.setBounds(30, 80, 300, 20);
		    borradorVariasPaginas.setBounds(30, 120, 300, 20);
		    borradorIntervaloPaginas.setBounds(30, 160, 300, 20);
		    
		    novelaUnaPagina.setBounds(30, 250, 300, 20);
		    novelaVariasPaginas.setBounds(30, 290, 300, 20);
		    novelaIntervaloPaginas.setBounds(30, 330, 300, 20);
		    
		    cronologia.setBounds(30, 420, 300, 20);
		    	    
		    add(borradorUnaPagina);
		    add(borradorVariasPaginas);
		    add(borradorIntervaloPaginas);
		    add(novelaUnaPagina);
		    add(novelaVariasPaginas);
		    add(novelaIntervaloPaginas);
		    add(cronologia);
	    
		//5) DECLARACION DE LOS ADD EVENTLISTENERS
		    borradorUnaPagina.addActionListener(this);
		    borradorVariasPaginas.addActionListener(this);
		    borradorIntervaloPaginas.addActionListener(this);
		    
		    novelaUnaPagina.addActionListener(this);
		    novelaVariasPaginas.addActionListener(this);
		    novelaIntervaloPaginas.addActionListener(this);
		    
		    cronologia.addActionListener(this);
	}
	public void habilitadorMenu(boolean activador)
	{
	    borradorUnaPagina.setEnabled(activador);
	    borradorVariasPaginas.setEnabled(activador);
	    borradorIntervaloPaginas.setEnabled(activador);
	    
	    novelaUnaPagina.setEnabled(activador);
	    novelaVariasPaginas.setEnabled(activador);
	    novelaIntervaloPaginas.setEnabled(activador);
	    
	    cronologia.setEnabled(activador);
	}
	
    @Override
    protected void paintComponent(Graphics g) 
    {
        super.paintComponent(g);
        if (this.imagen != null) {
            Graphics2D g2 = (Graphics2D) g.create();
            g2.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, this.alfaImagen));
            g2.drawImage(imagen, 0, 0, getWidth(), getHeight(), this);
            g2.dispose();
        }
    }
	public void actionPerformed(ActionEvent e) 
	{
		if(e.getSource()==borradorUnaPagina)
		{	
		//1) Accionamiento de BORRADOR sacar UNA SOLA PÁGINA
		//PINTAJE DE LOS MENUS SECUNDARIOS
		    //1.1.) BORRADOR SOLO UNA PAGINA
			this.habilitadorMenu(false);  //DESHABILITA EL MENU PRINCIPAL HASTA TERMINAR EL PROCESO
			paginaBorrador= new BorradorNovela(this,1);
			paginaBorrador.desactivarInterfazUnaPaginaBorrador(4);
	        this.paginaBorrador.activarInterfazUnaPaginaBorrador(1);  //Con numero 1 para identificar BORRADOR y UNA PAGINA
		}
		if(e.getSource()==borradorVariasPaginas)
		{
		//2) Accionamiento de BORRADOR sacar VARIAS PAGINAS
		//PINTAJE DE LOS MENUS SECUNDARIOS
		    //1.2.) BORRADOR SOLO UNA PAGINA
			this.habilitadorMenu(false);  //DESHABILITA EL MENU PRINCIPAL HASTA TERMINAR EL PROCESO
			paginaBorrador= new BorradorNovela(this,2);
			paginaBorrador.desactivarInterfazUnaPaginaBorrador(4);
	        this.paginaBorrador.activarInterfazUnaPaginaBorrador(2);  //Con numero 1 para identificar BORRADOR y VARIAS PAGINA
		}
		// 3) Accionamiento de BORRADOR sacar INTERVALO DE PAGINAS
		if(e.getSource()==borradorIntervaloPaginas)
		{
			//CREAR DOCUMENTO DE WORD
	        JOptionPane.showMessageDialog(null,"SE ACCIONÓ BORRADOR VARIAS PAGINAS",
	                "NOVELA COMETIDO 4321",
	                JOptionPane.INFORMATION_MESSAGE);
		}
		// 4) Accionamiento de NOVELA sacar UNA SOLA PÁGINA
		if(e.getSource()==novelaUnaPagina)
		{
			//CREAR DOCUMENTO DE PDF
	        JOptionPane.showMessageDialog(null,"SE ACCIONÓ NOVELA A UNA SOLA PAGINA",
	                "NOVELA COMETIDO 4321",
	                JOptionPane.INFORMATION_MESSAGE);
		}
		// 5) Accionamiento de NOVELA sacar VARIAS PAGINAS
		if(e.getSource()==novelaVariasPaginas)
		{
			//CREAR DOCUMENTO DE PDF
	        JOptionPane.showMessageDialog(null,"SE ACCIONÓ NOVELA VARIAS PAGINAS",
	                "NOVELA COMETIDO 4321",
	                JOptionPane.INFORMATION_MESSAGE);
		}
		// 6) Accionamiento de INTERVALO DE VARIAS PAGINAS
		if(e.getSource()==novelaIntervaloPaginas)
		{
			//CREAR DOCUMENTO DE PDF
	        JOptionPane.showMessageDialog(null,"SE ACCIONÓ NOVELA INTERVALO PAGINAS",
	                "NOVELA COMETIDO 4321",
	                JOptionPane.INFORMATION_MESSAGE);
		}
		// 7) Accionamiento de CRONOLOGIA DE LA NOVELA
		if(e.getSource()==cronologia)
		{
			//CREAR DOCUMENTO DE PDF
	        JOptionPane.showMessageDialog(null,"SE ACCIONÓ CRONOLOGIA DE LA NOVELA",
	                "NOVELA COMETIDO 4321",
	                JOptionPane.INFORMATION_MESSAGE);
		}
	}
}


