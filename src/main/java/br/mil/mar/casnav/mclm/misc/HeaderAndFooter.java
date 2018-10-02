package br.mil.mar.casnav.mclm.misc;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

public class HeaderAndFooter extends PdfPageEventHelper {

    private static Font headerFont = new Font(FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.BLACK );
    private static Font headerMiniFont = new Font(FontFamily.HELVETICA, 9, Font.NORMAL, BaseColor.BLACK );
    private static Font headerMediumFont = new Font(FontFamily.HELVETICA, 10, Font.BOLD, BaseColor.BLACK );
    private static Font footerFont = new Font(FontFamily.COURIER, 8, 0, BaseColor.GRAY );

    @Override
    public void onEndPage(PdfWriter writer, Document document) {
        PdfContentByte cb = writer.getDirectContent();

        SimpleDateFormat sdfDate = new SimpleDateFormat("dd/MM/yyyy");
        SimpleDateFormat sdfTime = new SimpleDateFormat("HH:mm:ss");
        Date now = new Date();
        String strDate = sdfDate.format(now);
        String strTime = sdfTime.format(now);
        
        // Header
        
        ColumnText.showTextAligned(cb, Element.ALIGN_CENTER, new Phrase("Marinha do Brasil",headerFont), 
                (document.right() - document.left()) / 2 + document.leftMargin(), document.top() + 10,    0);
        
        ColumnText.showTextAligned(cb, Element.ALIGN_CENTER, new Phrase("Diretoria de Hidrografia de Navegação",headerMiniFont), 
                (document.right() - document.left()) / 2 + document.leftMargin(), document.top() -5,      0);        
        
        ColumnText.showTextAligned(cb, Element.ALIGN_CENTER, new Phrase("Centro de Hidrografia da Marinha",headerMiniFont), 
                (document.right() - document.left()) / 2 + document.leftMargin(), document.top() -20,    0);        

        ColumnText.showTextAligned(cb, Element.ALIGN_CENTER, new Phrase("Previsão 24 Horas",headerMediumFont), 
                (document.right() - document.left()) / 2 + document.leftMargin(), document.top() -35,    0);        
        
        
        // Footer
        String version = "";
        try {
        	version = Configurator.getInstance().getConfig().getVersion();
        } catch ( Exception e ) {
        	//
        }
        
        ColumnText.showTextAligned(cb, Element.ALIGN_LEFT, new Phrase("SC-MET " + version,footerFont), 
                document.leftMargin() - 1, document.bottom() - 20, 0);
        
        ColumnText.showTextAligned(cb, Element.ALIGN_RIGHT, new Phrase( strDate + " " + strTime ,footerFont), 
                document.right() - 2 , document.bottom() - 10, 0);

        ColumnText.showTextAligned(cb, Element.ALIGN_RIGHT, new Phrase("*******",footerFont), 
                document.right() - 2 , document.bottom() - 20, 0);
        
        
    }	
	
}
