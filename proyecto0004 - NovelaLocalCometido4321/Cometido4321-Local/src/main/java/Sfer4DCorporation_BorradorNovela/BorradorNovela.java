package Sfer4DCorporation_BorradorNovela;

import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.geom.Rectangle2D;

import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;

import org.apache.poi.openxml4j.util.ZipSecureFile;
import org.apache.poi.sl.usermodel.Placeholder;
import org.apache.poi.xslf.usermodel.*;
import org.apache.poi.util.IOUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class BorradorNovela implements ActionListener
{
    //1) DECLARACION DE TITULOS DE GRUPOS BOTONERAS
    private JLabel nombreSector;
    private JButton aceptar,volver;
    
    //2) DECLARACION DE SNIPPER SELECTOR DE DIAPOSITIVA
    private SpinnerNumberModel pagina;
    private JSpinner selectorPagina;
       
    //3) DECLARACION DE VARIABLE SELECTOR DE OPERACIÓN DEL BORRADOR
    private int semaforoBorrador;
    private boolean mensajeFueraRango=false;
    
    //4) FICHERO JSON
	private FileWriter apuntador; 
	private final ObjectMapper mapper = new ObjectMapper();   //Para el uso de JACKSON no JSON
    
	public BorradorNovela(JPanel PanelHallNovela)
	{
		//4) COLOCACION DEL TITULO DE PRESENTACION
			nombreSector = new JLabel("SECTOR BORRADOR UNA PÁGINA");
			nombreSector.setFont(new Font("Segoe UI", Font.BOLD, 15));
			nombreSector.setForeground(new Color(102, 0, 102));
			nombreSector.setBounds(400, 60, 300, 20);
			PanelHallNovela.add(nombreSector);
		
		//5) COLOCA LOS NUEVOS COMPONENTES SOBRE EL MISMO MENU DE OPCIONES: SPINNER Y BOTONES
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
    	
    	//2) REFRESCA EL JPANEL PARA QUE APAREZCAN LOS COMPONENTES AÑADIDOS, COMO SI SE ACTUALIZARA
	    	PanelHallNovela.revalidate();
	    	PanelHallNovela.repaint();
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		if(e.getSource()==aceptar)
		{
			switch(this.getSemaforoBorrador())
			{
				case 1:
				{
				    //ACTUALIZACION DE DATOS DE DIAPOSITIVA INICIAL Y FINAL QUE COINCIDEN
				       //ATENCION, COMO ES UNA SOLA PAGINA, TANTO EL VALOR INICIAL COMO EL FINAL COINCIDEN
				    this.informacionExtraida((Integer) selectorPagina.getValue(), (Integer) selectorPagina.getValue());
					this.desactivarInterfazUnaPaginaBorrador(1);
					break;
				}
				case 2:
				{
				    //ACTUALIZACION DE DATOS DE DIAPOSITIVA INICIAL Y FINAL QUE COINCIDEN
				       //ATENCION, COMO SON VARIAS DIAPOSITIVAS, EL VALOR INICIAL ES 1 Y EL FINAL ES EL ELEGIDO
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
	
	public void desactivarInterfazUnaPaginaBorrador(int selector)
	{
		switch(selector)
		{
			case 1:
			{
			    //1) DECLARACION DE TITULOS DE GRUPOS BOTONERAS
			    this.nombreSector.setVisible(false);
			    
			    //2) DECLARACION DE SNIPPER SELECTOR DE DIAPOSITIVA
			    this.selectorPagina.setVisible(false);
			       
			    //3) DECLARACION DE BOTONES IMPLICADOS
			    this.aceptar.setVisible(false);
			    this.volver.setVisible(false);
			break;
			}
			case 2:
			{
				
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
			case 1:
			{
				//BORRADOR DE UNA SOLA PAGINA
			    //1) DECLARACION DE TITULOS DE GRUPOS BOTONERAS
			    this.nombreSector.setVisible(true);
			    
			    //2) DECLARACION DE SNIPPER SELECTOR DE DIAPOSITIVA
			    this.selectorPagina.setVisible(true);
			       
			    //3) DECLARACION DE BOTONES IMPLICADOS
			    this.aceptar.setVisible(true);
			    this.volver.setVisible(true);
				break;
			}
			case 2:
			{
				//BORRADOR DE VARIAS PAGINAS
				
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
	public void informacionExtraida(int numInicial,int numFinal) {
		//1) COMPROBAMOS LA MEMORIA RAM INICIALMENTE DISPONIBLE
		System.out.println("Max RAM JVM: "
			    + Runtime.getRuntime().maxMemory()
			      / 1024 / 1024
			    + " MB");
        mostrarRAM("ANTES DE PROCESAR PPT");

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
	        System.out.println("DIAPOSITIVA INICIAL: "+(Integer)numInicial+" DIAPOSITIVA FINAL: "+(Integer)numFinal);
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
	     mostrarRAM("ANTES DE LIMPIAR MEMORIA");
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
	     mostrarRAM("DESPUES DE LIMPIAR MEMORIA");  
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
	private void mostrarRAM(String mensaje)
	{
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

	    System.out.println("===== " + mensaje + " =====");
	    System.out.println("RAM usada: " + memoriaUsada + " MB");
	    System.out.println("RAM libre: " + memoriaLibre + " MB");
	    System.out.println("RAM reservada JVM: " + memoriaTotal + " MB");
	    System.out.println();
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
