package Sfer4DCorporation_BorradorNovela;

import java.awt.Color;
import java.awt.Component;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.geom.Rectangle2D;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;

import org.apache.poi.openxml4j.util.ZipSecureFile;
import org.apache.poi.sl.usermodel.Placeholder;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFNotes;
import org.apache.poi.xslf.usermodel.XSLFShape;
import org.apache.poi.xslf.usermodel.XSLFSlide;
import org.apache.poi.xslf.usermodel.XSLFTextShape;

import com.fasterxml.jackson.databind.ObjectMapper;

public class BorradorNovela implements ActionListener
{
    //0) DECLARACION DE TITULOS DE GRUPOS BOTONERAS Y SNIPPER SELECTOR DE DIAPOSITIVA
	    //0.1) BORRADOR UNA PAGINA y BORRADOR VARIAS PAGINAS
			private JLabel nombreSector;
		    private JButton aceptar,volver;
		    
		    private SpinnerNumberModel pagina;
		    private JSpinner selectorPagina;
    //1) DECLARACION DEL JPANEL TABLERO
    private JPanel PanelHallNovela;
    
    //2) DECLARACION DE VARIABLE SELECTOR DE OPERACIÓN DEL BORRADOR
    private int semaforoBorrador;
    private boolean mensajeFueraRango=false;
    private int diapositivaInicial, diapositivaFinal;
    
    //3) FICHERO JSON Y CONSUMO DE MEMORIA RAM Y DISCO
	    //3.1) FICHERO JSON
	    private FileWriter apuntador; 
		private final ObjectMapper mapper = new ObjectMapper();   //Para el uso de JACKSON no JSON
		//3.2) CONSUMO DE MEMORIA RAM Y DISCO
		private JLabel maxRAM,mensajeDinamico,usadaRAM,libreRAM,reservadaRAM,mensajeDiapositivas;
    
	public BorradorNovela(JPanel PanelHallNovela,int selector)
	{		
		//4) COLOCACION DE ELEMENTOS DEL SELECTOR BORRADOR-UNA SOLA PAGINA
		  //4.1) COLOCACION DEL TITULO DE PRESENTACION
			switch(selector)
			{
				case 1:
				{
					nombreSector = new JLabel("SECTOR BORRADOR UNA PÁGINA");
					break;
				}
				case 2:
				{
					nombreSector = new JLabel("SECTOR BORRADOR VARIAS PÁGINAS");
					break;
				}
				default:
				{
					//no hace nada porque esta fuera del selector
				}
			}
			nombreSector.setFont(new Font("Segoe UI", Font.BOLD, 15));
			nombreSector.setForeground(new Color(102, 0, 102));
			nombreSector.setBounds(400, 60, 300, 20);
			PanelHallNovela.add(nombreSector);
			
			//4.2) COLOCA LOS NUEVOS COMPONENTES SOBRE EL MISMO MENU DE OPCIONES: SPINNER Y BOTONES
		    	SpinnerNumberModel modelo = new SpinnerNumberModel(
		    	        1,    // valor inicial
		    	        1,    // mínimo
		    	        5000,  // máximo
		    	        1     // incremento
		    	);
		    	selectorPagina = new JSpinner(modelo);
		    	selectorPagina.setBounds(470, 100, 100, 20);
		    	PanelHallNovela.add(selectorPagina);
	    	
		    	aceptar= new JButton("ACEPTAR");
		    	aceptar.setBounds(410, 150, 100, 20);
		    	PanelHallNovela.add(aceptar);
		    	aceptar.addActionListener(this);
		    	
		    	volver= new JButton("VOLVER");
		    	volver.setBounds(530, 150, 100, 20);
		    	PanelHallNovela.add(volver);
		    	volver.addActionListener(this);
	    	
	    	//4.3) REFRESCA EL JPANEL PARA QUE APAREZCAN LOS COMPONENTES AÑADIDOS, COMO SI SE ACTUALIZARA
		    	PanelHallNovela.revalidate();
		    	PanelHallNovela.repaint();
		    
		    //4.4) SE GUARDA EL JPANEL PARA EL POSTERIOR USO
		    	this.setPanelHallNovela(PanelHallNovela);		    	
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		if(e.getSource()==aceptar)
		{
			switch(this.getSemaforoBorrador())
			{
				case 1,2:
				{
				    if(this.getSemaforoBorrador()==1)
				    {
					//ACTUALIZACION DE DATOS DE DIAPOSITIVA INICIAL Y FINAL QUE COINCIDEN
					  //ATENCION, COMO ES UNA SOLA PAGINA, TANTO EL VALOR INICIAL COMO EL FINAL COINCIDEN
						this.informacionExtraida((Integer) selectorPagina.getValue(), (Integer) selectorPagina.getValue());
				    }
				    else
				    {
					 //ACTUALIZACION DE DATOS DE DIAPOSITIVA INICIAL Y FINAL QUE COINCIDEN
					   //ATENCION, COMO SON VARIAS DIAPOSITIVAS, EL VALOR INICIAL ES 1 Y EL FINAL ES EL ELEGIDO
						this.informacionExtraida(1,(Integer) selectorPagina.getValue());
				    }
					break;
				}
				case 3:
				{
				    //ACTUALIZACION DE DATOS DE DIAPOSITIVA INICIAL Y FINAL QUE COINCIDEN
				       //ATENCION, COMO ES UN INTERVALO DE PAGINAS SE TENDRAN UN VALOR INICIAL Y FINAL
					break;
				}
				default:
				{
					//NO HACE NADA PORQUE NO EXISTE ESA OPCION
					break;
				}
			}
		}
		if(e.getSource()==volver)
		{
			switch(this.getSemaforoBorrador())
			{
				case 1:{this.desactivarInterfazUnaPaginaBorrador(1);break;}
				case 2:{this.desactivarInterfazUnaPaginaBorrador(2);break;}
				case 3:{this.desactivarInterfazUnaPaginaBorrador(3);break;}
			}
			for(Component c : PanelHallNovela.getComponents())
			{
			    if(c instanceof JButton)
			    {
			        c.setEnabled(true);
			    }
			}
		}
	}
	
	public int getSemaforoBorrador()
	{
		return this.semaforoBorrador;
	}
	
	public void setSemaforoBorrador(int semaforoBorrador)
	{
		this.semaforoBorrador=semaforoBorrador;
	}
	public JPanel getPanelHallNovela()
	{
		return this.PanelHallNovela;
	}
	public void setPanelHallNovela(JPanel PanelHallNovela)
	{
		this.PanelHallNovela=PanelHallNovela;
	}
    public int getDiapositivaInicial()
    {
    	return this.diapositivaInicial;
    }
    public void setDiapositivaInicial(int diapositivaInicial)
    {
    	this.diapositivaInicial=diapositivaInicial;
    }
    public int getDiapositivaFinal()
    {
    	return this.diapositivaFinal;
    }
    public void setDiapositivaFinal(int diapositivaFinal)
    {
    	this.diapositivaFinal=diapositivaFinal;
    }
	
	public void desactivarInterfazUnaPaginaBorrador(int selector)
	{
		switch(selector)
		{
			case 1,2:
			{
			    //1) DESACTIVACION DE BOTONES DEL SUBMENU BORRADOR UNA PAGINA
			    this.nombreSector.setVisible(false);
			    
			    //2) DECLARACION DE SNIPPER SELECTOR DE DIAPOSITIVA
			    this.selectorPagina.setVisible(false);
			       
			    //3) DECLARACION DE BOTONES IMPLICADOS
			    this.aceptar.setVisible(false);
			    this.volver.setVisible(false);
			    
			    //4) DECLARACION DE JLABELS QUE SE DESACTIVARAON
				for(Component componente : this.getPanelHallNovela().getComponents())
				{
				    if(componente instanceof JLabel)
				    {
				        JLabel lbl = (JLabel) componente;
				        if("estudioRAM".equals(lbl.getName()))
				        {
				            lbl.setVisible(false);
				        }
				    }
				}
			break;
			}
			case 3:
			{
				
				break;
			}
			case 4:
			{
				//Esta opcion solo para el principio del todo al ejecutar de poner todos los 
				//botones de todas las secciones en invisibilidad: setVisible();
				//DESACTIVACION DEL SUBMENU BORRADOR UNA PAGINA
					//1) DESACTIVACION DE BOTONES
				    this.nombreSector.setVisible(false);
				    
				    //2) DECLARACION DE SNIPPER SELECTOR DE DIAPOSITIVA
				    this.selectorPagina.setVisible(false);
				       
				    //3) DECLARACION DE BOTONES IMPLICADOS
				    this.aceptar.setVisible(false);
				    this.volver.setVisible(false);
				  
				break;
			}
			default:
			{
				break;
			}
		}
	}
	public void activarInterfazUnaPaginaBorrador(int selector)
	{
		switch(selector)
		{
			case 1,2:
			{
				//BORRADOR DE UNA SOLA PAGINA y BORRADOR DE VARIAS PAGINAS
			    //1) DECLARACION DE TITULOS DE GRUPOS BOTONERAS
			    this.nombreSector.setVisible(true);
			    
			    //2) DECLARACION DE SNIPPER SELECTOR DE DIAPOSITIVA
			    this.selectorPagina.setVisible(true);
			       
			    //3) DECLARACION DE BOTONES IMPLICADOS
			    this.aceptar.setVisible(true);
			    this.volver.setVisible(true);
				break;
			}
			case 3:
			{
				//BORRADOR DE INTERVALO DE PAGINAS
				
				break;
			}
			default:
			{
				//NO HACE NADA
				break;
			}
		}
	    //4) ACTUALIZA EL SELECTOR QUE SE HA ELEGIDO
	    this.setSemaforoBorrador(selector);
	}
	public void informacionExtraida(int numInicial,int numFinal) 
	{
		//0) ALMACENAJE DE LAS VARIABLES DE LA DIAPOSITIVA INICIAL Y FINAL
		setDiapositivaInicial(numInicial);
		setDiapositivaFinal(numFinal);
		
		//1) COMPROBAMOS LA MEMORIA RAM INICIALMENTE DISPONIBLE
		mostrarRAM("MAXIMA RAM JVM",0);
        mostrarRAM("ANTES DE PROCESAR PPT",1);

        //2) SE SOLICITA EL FICHERO QUE SE PROCESARA DE TIPO POWER POINT
	    File fichero = selectorURL();
	
	    if (fichero == null) 
	    {   
	    	//SI NO HAY NINGUN FICHERO POWER POINT SE CANCELA EL METODO Y TERMINA
	        JOptionPane.showMessageDialog(null,"No se ha seleccionado ningún PowerPoint.");
	        return;
	    }
	    //3) PARA FICHEROS GRANDES SE AUMENTA EL LÍMITE DE SEGURIDAD
	    	ZipSecureFile.setMaxFileCount(50000);
	    	IOUtils.setByteArrayMaxOverride(500000000);
	    
	    //4) SE PROCEDE CON LA EXTRACCION DE LA INFORMACION
	    	
	    	List<InformacionDiapositivas> diapositivas = null;  //DECLARACION DE LA COLECCION QUE ALMACENARA LOS DATOS
	    	
	    try (FileInputStream fis = new FileInputStream(fichero);
	         XMLSlideShow ppt = new XMLSlideShow(fis)) 
	    	{
	        diapositivas = new ArrayList<>();
	        int numSlide = 1;  //SE PONE COMO DIAPOSITIVA INICIAL AQUELLA ELEGIDA POR EL USUARIO
	        for(XSLFSlide slide : ppt.getSlides()) 
	        {
	            if((Integer)numInicial>ppt.getSlides().size() || (Integer)numFinal>ppt.getSlides().size())
	            {
	            	mensajeFueraRango=true;
	            	break;
	            }
	            if (numSlide<(Integer)numInicial)
	            {
	                numSlide++;
	                continue;    //ITERA EL BUCLE SIN EJECUTAR EL CODIGO INFERIOR
	            }
	            if (numSlide>(Integer)numFinal)
	            {
	                break;       //DETIENE EL BUCLE Y TERMINA
	            }
		            //4.1 TEXTO DEL TITULO
		            String titulo = slide.getTitle();
		            //4.2 TEXTO DEL CUERPO
		            StringBuilder cuerpo = new StringBuilder();
		            //4.3 TEXTO DE LA FIGURA AÑADIDA
		            String comentario="";
		            boolean semaforo=false;
		            
		            for (XSLFShape shape : slide.getShapes()) 
		            {
	            	    Rectangle2D area = shape.getAnchor();  //Definimos el ancho de la caja texto detectada
		            	if (shape instanceof XSLFTextShape textShape) 
		            	{
		            	    Placeholder tipo = textShape.getTextType();
		            	    if (tipo == Placeholder.TITLE || tipo == Placeholder.CENTERED_TITLE){continue;}
		            	    if(shape instanceof XSLFTextShape txt && area.getX()>600 && area.getY()<150)
		            	    {
		            	        comentario=txt.getText();   //Recogemos el contenido del texto de la figura
		            	        semaforo=true;
		            	    }
		            	    String texto = textShape.getText();
	
		            	    if (texto != null && !texto.isBlank() && !semaforo) {
		            	        cuerpo.append(texto).append("\n");
		            	        semaforo=false;
		            	    }
		            	}
		            }
		            //4.4 TEXTO DE LAS NOTAS
		            String notasTexto = "";
		
		            XSLFNotes notas = slide.getNotes();
		
		            if (notas != null) 
		            {
		                StringBuilder sbNotas = new StringBuilder();
		                for (XSLFShape shape : notas.getShapes()) 
		                {
		                    if (shape instanceof XSLFTextShape textShape) 
		                    {
		                        String texto = textShape.getText();
		                        if (texto != null && !texto.isBlank()) 
		                        {
		                            sbNotas.append(texto).append("\n");
		                        }
		                    }
		                }
		                notasTexto = sbNotas.toString();   //CONVERTIR A STRING DESDE STRINGBUILDER
		            }
		
		            InformacionDiapositivas diapositiva =
		                    new InformacionDiapositivas(
		                            numSlide,
		                            titulo,
		                            cuerpo.toString(),
		                            notasTexto,
		                            comentario);
     		            diapositivas.add(diapositiva);
	    	        numSlide++;
		        }
		        if(mensajeFueraRango)
		        {
			        JOptionPane.showMessageDialog(null,"SELECTOR FUERA DE RANGO, CANCELANDO OPERACIÓN!",
			                "NOVELA COMETIDO 4321",
			                JOptionPane.WARNING_MESSAGE);
			        mensajeFueraRango=false;  //Se devuelve al valor original por si se ejecuta un segundo ciclo
		        }
		        else {
		    	    //5) SE CREA EL MAPA DE DATOS CONVERTIDOS A JSON PARA GUARDARLOS EN EL FICHERO CREADO JSON 
			        ObjectMapper mapper =  new ObjectMapper();    //SE CREA EL MAPA
			        File jsonSalida = new File(fichero.getParent() + File.separator + "ficheroJSON.json");  //SE CREA EL FICHERO JSON
			        mapper.writerWithDefaultPrettyPrinter().writeValue(jsonSalida,diapositivas);  //SE ESCRIBE EN EL FICHERO JSON
			        JOptionPane.showMessageDialog(null,"JSON generado correctamente.");  //SE LANZA MENSAJE DE TODO OKEY
		        }
	       } catch (Exception e) {
	         e.printStackTrace();
	         JOptionPane.showMessageDialog(null,"Error al procesar el PowerPoint.");
	    }
	    
	    //6) MOSTRAR LA MEMORIA ANTES DE SER LIMPIADA TRAS EL PROCESO DE MOVER INFORMACION DEL POWER POINT AL FICHERO JSON
	     mostrarRAM("ANTES DE LIMPIAR MEMORIA",2);
	     diapositivas.clear();   //SE LIMPIA LA COLECCION DE DATOS EXTRAIDOS
	     diapositivas = null;    //SE LIMPIA DEL TODO
	     System.gc();            //SE LIBERA LA MEMORIA DEL SISTEMA
	     try {
			Thread.sleep(3000);  //ESPERA 3 SEGUNDOS MIENTRAS TERMINA DE LIMPIARSE
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    
	    //7) SE MOSTRARA LA MEMORIA UTILIZADA TRAS LA LIMPIEZA QUE DEBERA QUEDAR SIMILAR AL INICIO O IGUAL
	     mostrarRAM("DESPUES DE LIMPIAR MEMORIA",3);  
	}
	//METODO PARA ELEGIR LA URL DEL FICHERO POR EL USUARIO
	public File selectorURL()
	{
		//1) SE DECLARA EL SELECTOR DE FICHERO
	    JFileChooser chooser = new JFileChooser();
	    
	    //2) SE INVOCA UNA VENTANA DEL NAVEGADOR PARA ELEGIR UNA RUTA
	    int resultado = chooser.showOpenDialog(null);

	    //3) SE APRUEBA QUE LA SELECCION REALIZADA COINCIDA CON EL FORMATO POWER POINT
	    if (resultado == JFileChooser.APPROVE_OPTION) {
	        return chooser.getSelectedFile();  //DEVUELVE LA RUTA GENERADA POR EL USUARIO
	    }
	    return null;
	}
	
	//METODO PARA CREAR, EDITAR, ACTUALIZAR Y GUARDAR LA INFORMACION EN UN FICHERO JSON

	public void crearJSON(File fichero) throws IOException
	{
		// CREACION FICHERO JSON
		apuntador=new FileWriter(fichero.getParent().toString()+File.separator +"ficheroJSON.json");
		apuntador.write("{\"diapositivas\":[");
	}

	public void escribirJSON(InformacionDiapositivas diapositiva,boolean ultimaDiapositiva) throws IOException 
	{
	    apuntador.write(mapper.writeValueAsString(diapositiva));
	    if (!ultimaDiapositiva) 
	    {
	        apuntador.write(",\n");
	    }
	}

	public void cerrarJSON() throws IOException
	{
		apuntador.write("]}");
		apuntador.close();
	}
	private void mostrarRAM(String mensaje,int sincronizado)
	{
		JPanel panelMensajes=this.getPanelHallNovela();
		if(sincronizado==0)
		{
			maxRAM= new JLabel(mensaje+ Runtime.getRuntime().maxMemory()
				      / 1024 / 1024
					    + " MB");
			maxRAM.setBounds(500, 250, 100, 20);
			maxRAM.setName("estudioRAM");
			panelMensajes.add(nombreSector);
		}
		if(sincronizado==1)
		{
			//CALCULO DE LA OCUPACION DE LOS RECURSOS DEL PC
		    Runtime runtime = Runtime.getRuntime();

		    long memoriaUsada =
		            (runtime.totalMemory() - runtime.freeMemory())
		            / 1024 / 1024;

		    long memoriaTotal =
		            runtime.totalMemory()
		            / 1024 / 1024;

		    long memoriaLibre =
		            runtime.freeMemory()
		            / 1024 / 1024;
		    
		    //MENSAJE DINAMICO
			mensajeDinamico=new JLabel("=== " + mensaje + " ===");
			mensajeDinamico.setBounds(410, 160+20*sincronizado, 250, 20);
			mensajeDinamico.setName("estudioRAM");
			panelMensajes.add(mensajeDinamico);
			
			//MEMORIA RAM USADA: ANTES, DURANTE Y DESPUES DEL PROCESO
			usadaRAM= new JLabel("RAM usada: " + memoriaUsada + " MB");
			usadaRAM.setBounds(410, 160+40*sincronizado, 250, 20);
			usadaRAM.setName("estudioRAM");
			panelMensajes.add(usadaRAM);
			
			//MEMORIA RAM LIBRE: ANTES, DURANTE Y DESPUES DEL PROCESO
			libreRAM= new JLabel("RAM libre: " + memoriaLibre + " MB");
			libreRAM.setBounds(410, 160+60*sincronizado, 250, 20);
			libreRAM.setName("estudioRAM");
			panelMensajes.add(libreRAM);
			
			//MEMORIA RAM TOTAL: ANTES, DURANTE Y DESPUES DEL PROCESO
			reservadaRAM= new JLabel("RAM reservada JVM: " + memoriaTotal + " MB");
			reservadaRAM.setBounds(410, 160+80*sincronizado, 250, 20);
			reservadaRAM.setName("estudioRAM");
			panelMensajes.add(reservadaRAM);
			
	    	//REFRESCA EL JPANEL PARA QUE APAREZCAN LOS COMPONENTES AÑADIDOS, COMO SI SE ACTUALIZARA
	    	PanelHallNovela.revalidate();
	    	PanelHallNovela.repaint();
		}
		if(sincronizado==2)
		{
			//CALCULO DE LA OCUPACION DE LOS RECURSOS DEL PC
		    Runtime runtime = Runtime.getRuntime();

		    long memoriaUsada =
		            (runtime.totalMemory() - runtime.freeMemory())
		            / 1024 / 1024;

		    long memoriaTotal =
		            runtime.totalMemory()
		            / 1024 / 1024;

		    long memoriaLibre =
		            runtime.freeMemory()
		            / 1024 / 1024;
		    
		    //MENSAJE DINAMICO
			mensajeDinamico=new JLabel("=== " + mensaje + " ===");
			mensajeDinamico.setBounds(410, 160+20+90*(sincronizado-1), 250, 20);
			mensajeDinamico.setName("estudioRAM");
			panelMensajes.add(mensajeDinamico);
			
			//MEMORIA RAM USADA: ANTES, DURANTE Y DESPUES DEL PROCESO
			usadaRAM= new JLabel("RAM usada: " + memoriaUsada + " MB");
			usadaRAM.setBounds(410, 160+40+90*(sincronizado-1), 250, 20);
			usadaRAM.setName("estudioRAM");
			panelMensajes.add(usadaRAM);
			
			//MEMORIA RAM LIBRE: ANTES, DURANTE Y DESPUES DEL PROCESO
			libreRAM= new JLabel("RAM libre: " + memoriaLibre + " MB");
			libreRAM.setBounds(410,160+60+90*(sincronizado-1), 250, 20);
			libreRAM.setName("estudioRAM");
			panelMensajes.add(libreRAM);
			
			//MEMORIA RAM TOTAL: ANTES, DURANTE Y DESPUES DEL PROCESO
			reservadaRAM= new JLabel("RAM reservada JVM: " + memoriaTotal + " MB");
			reservadaRAM.setBounds(410,160+80+90*(sincronizado-1), 250, 20);
			reservadaRAM.setName("estudioRAM");
			panelMensajes.add(reservadaRAM);
			
	    	//REFRESCA EL JPANEL PARA QUE APAREZCAN LOS COMPONENTES AÑADIDOS, COMO SI SE ACTUALIZARA
	    	PanelHallNovela.revalidate();
	    	PanelHallNovela.repaint();
		}
		if(sincronizado==3)
		{
			//CALCULO DE LA OCUPACION DE LOS RECURSOS DEL PC
		    Runtime runtime = Runtime.getRuntime();

		    long memoriaUsada =
		            (runtime.totalMemory() - runtime.freeMemory())
		            / 1024 / 1024;

		    long memoriaTotal =
		            runtime.totalMemory()
		            / 1024 / 1024;

		    long memoriaLibre =
		            runtime.freeMemory()
		            / 1024 / 1024;
		    
		    //MENSAJE DINAMICO
			mensajeDinamico=new JLabel("=== " + mensaje + " ===");
			mensajeDinamico.setBounds(410, 160+20+90*(sincronizado-1), 250, 20);
			mensajeDinamico.setName("estudioRAM");
			panelMensajes.add(mensajeDinamico);
			
			//MEMORIA RAM USADA: ANTES, DURANTE Y DESPUES DEL PROCESO
			usadaRAM= new JLabel("RAM usada: " + memoriaUsada + " MB");
			usadaRAM.setBounds(410, 160+40+90*(sincronizado-1), 250, 20);
			usadaRAM.setName("estudioRAM");
			panelMensajes.add(usadaRAM);
			
			//MEMORIA RAM LIBRE: ANTES, DURANTE Y DESPUES DEL PROCESO
			libreRAM= new JLabel("RAM libre: " + memoriaLibre + " MB");
			libreRAM.setBounds(410,160+60+90*(sincronizado-1), 250, 20);
			libreRAM.setName("estudioRAM");
			panelMensajes.add(libreRAM);
			
			//MEMORIA RAM TOTAL: ANTES, DURANTE Y DESPUES DEL PROCESO
			reservadaRAM= new JLabel("RAM reservada JVM: " + memoriaTotal + " MB");
			reservadaRAM.setBounds(410,160+80+90*(sincronizado-1), 250, 20);
			reservadaRAM.setName("estudioRAM");
			panelMensajes.add(reservadaRAM);
			
			//DIAPOSITIVAS IMPLICADAS INICIO Y FINAL
			mensajeDiapositivas= new JLabel("INICIAL: "+(Integer)this.getDiapositivaInicial()+" FINAL: "+(Integer)this.getDiapositivaFinal());
			mensajeDiapositivas.setBounds(410, 160+100+90*(sincronizado-1), 250, 20);
			mensajeDiapositivas.setName("estudioRAM");
			panelMensajes.add(mensajeDiapositivas);
			
	    	//REFRESCA EL JPANEL PARA QUE APAREZCAN LOS COMPONENTES AÑADIDOS, COMO SI SE ACTUALIZARA
	    	PanelHallNovela.revalidate();
	    	PanelHallNovela.repaint();
		}
	}
}

class InformacionDiapositivas
{
	private int numeroDiapositiva;   //ZONA NUMERO DE LA DIAPOSITIVA
	private String textoTitulo;      //ZONA TEXTO DEL TITULO
	private String textoCuerpo;      //ZONA TEXTO DEL CUERPO GUARDADO COMO STRINBUILDER PARA POSTERIOR TRATAMIENTO DE TEXTO
	private String textoPie;         //ZONA INFERIOR COMENTARIOS
	private String textoFigura;		 //ZONA TEXTO UBICADO EN POSICIÓN SUPERIOR DERECHA
	
	public InformacionDiapositivas(int numeroDiapositiva,String textoTitulo, String textoCuerpo, String textoPie, String textoFigura)
	{
		this.numeroDiapositiva=numeroDiapositiva;
		this.textoTitulo=textoTitulo;
		this.textoCuerpo=textoCuerpo;
		this.textoPie=textoPie;
		this.textoFigura=textoFigura;
	}

	public int getNumeroDiapositiva() {
		return numeroDiapositiva;
	}

	public void setNumeroDiapositiva(int numeroDiapositiva) {
		this.numeroDiapositiva = numeroDiapositiva;
	}

	public String getTextoTitulo() {
		return textoTitulo;
	}

	public void setTextoTitulo(String textoTitulo) {
		this.textoTitulo = textoTitulo;
	}

	public String getTextoCuerpo() {
		return textoCuerpo;
	}

	public void setTextoCuerpo(String textoCuerpo) {
		this.textoCuerpo = textoCuerpo;
	}

	public String getTextoPie() {
		return textoPie;
	}

	public void setTextoPie(String textoPie) {
		this.textoPie = textoPie;
	}
	public String getTextoFigura() {
		return textoFigura;
	}

	public void setTextoFigura(String textoFigura) {
		this.textoFigura = textoFigura;
	}
}
