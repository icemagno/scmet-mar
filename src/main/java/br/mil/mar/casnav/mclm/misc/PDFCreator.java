package br.mil.mar.casnav.mclm.misc;

import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import br.mil.mar.casnav.mclm.persistence.entity.Meteoro;


public class PDFCreator {

	private Paragraph getParagraph( float left, String text, Font footerFont ) {
        Paragraph pp = new Paragraph( text, footerFont );
        pp.setIndentationLeft( left );
        return pp;
	}
	
	
	public String gerarPDF( Meteoro met ) throws Exception {
		
		String outputFolder = PathFinder.getInstance().getPath() + "/tempmaps/";
		new File(outputFolder).mkdirs();
		
		String pdfName = UUID.randomUUID().toString().toUpperCase().substring(0,8) + ".pdf";
		String pdfFullPath = outputFolder + File.separator + pdfName;
		
		Document document = new Document( PageSize.A4 );
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream( pdfFullPath ) );
		document.open();
		document.addCreator("APOLO");
		document.addAuthor("Carlos Magno O. Abreu");
		document.addTitle("CASNAV");
		document.addCreationDate();
		
		writer.setPageEvent( new HeaderAndFooter() );

		
		String brasaoDefesaPath = PathFinder.getInstance().getPath() + "/img/dhn.gif";
		Image brasaoDefesa = Image.getInstance( brasaoDefesaPath );
		brasaoDefesa.scaleAbsolute(55,70);	
		brasaoDefesa.setAbsolutePosition( 35, PageSize.A4.getHeight() - brasaoDefesa.getScaledHeight() - 15);
		document.add(brasaoDefesa);
		

		Font smallFont = new Font(FontFamily.TIMES_ROMAN , 8, 0, BaseColor.BLACK );
		Font smallHeader = new Font(FontFamily.TIMES_ROMAN , 9, Font.BOLD, BaseColor.BLACK );
		Font headerFont = new Font(FontFamily.TIMES_ROMAN , 10, Font.BOLD, BaseColor.BLACK );
		headerFont.setStyle("underline");
		
		document.add( new Paragraph("\n\n\n\n") );
		
		document.add( getParagraph(0, met.getTexto(), headerFont) );
		document.add( getParagraph(0, " * Data e hora referenciada ao Meridiano de Greenwich - HMG." , smallFont) );
		document.add( getParagraph(0, " * Pressão em Hectopascal - HPA." , smallFont) );
		document.add( getParagraph(0, " * Vento na escala Beaufort." , smallFont) );
		document.add( getParagraph(0, " * Ondas em metros." , smallFont) );

		document.add( new Paragraph("\n") );
		document.add( getParagraph(0, "PARTE UM - AVISOS DE MAU TEMPO", headerFont) );
		document.add( new Paragraph("\n") );
		
		document.add( getParagraph(0, "PARTE DOIS - ANÁLISE DO TEMPO EM " + met.getDataAnaliseP2(), headerFont) );
		document.add( new Paragraph("\n") );
		document.add( getParagraph(0, met.getTextoAnaliseP2() , smallFont) );
		document.add( new Paragraph("\n") );
		
		document.add( getParagraph(0, "PARTE TRÊS - PREVISÃO DO TEMPO VÁLIDA DE " + met.getValidadePrevisaoP3(), headerFont) );
		document.add( new Paragraph("\n") );		
		document.add( getParagraph(0, "Área Alfa ( de Arroio Chuí até Cabo de Santa Marta )", smallHeader) );
		document.add( new Paragraph("") );
		document.add( getParagraph(10, met.getAa() , smallFont) );
		document.add( new Paragraph("\n") );		
		
		document.add( getParagraph(0, "Área Bravo ( de Cabo de Santa Marta até Cabo Frio - Oceânica )", smallHeader) );
		document.add( new Paragraph("") );
		document.add( getParagraph(10, met.getAb() , smallFont) );
		document.add( new Paragraph("\n") );		
		
		document.add( getParagraph(0, "Área Charlie ( de Cabo de Santa Marta até Cabo Frio - Costeira )", smallHeader) );
		document.add( new Paragraph("") );
		document.add( getParagraph(10, met.getAc() , smallFont) );
		document.add( new Paragraph("\n") );		
		
		document.add( getParagraph(0, "Área Delta ( de Cabo Frio até Caravelas )", smallHeader) );
		document.add( new Paragraph("") );
		document.add( getParagraph(10, met.getAd() , smallFont) );
		document.add( new Paragraph("\n") );		
		
		document.add( getParagraph(0, "Área Echo ( de Caravelas até Salvador )", smallHeader) );
		document.add( new Paragraph("") );
		document.add( getParagraph(10, met.getAe() , smallFont) );
		document.add( new Paragraph("\n") );		
		
		document.add( getParagraph(0, "Área Foxtrot ( de Salvador até Natal )", smallHeader) );
		document.add( new Paragraph("") );
		document.add( getParagraph(10, met.getAf() , smallFont) );
		document.add( new Paragraph("\n") );		
		
		document.add( getParagraph(0, "Área Golf ( de Natal até São Luis )", smallHeader) );
		document.add( new Paragraph("") );
		document.add( getParagraph(10, met.getAg() , smallFont) );
		document.add( new Paragraph("\n") );		
		
		document.add( getParagraph(0, "Área Hotel ( de São Luis até Cabo Orange )", smallHeader) );
		document.add( new Paragraph("") );
		document.add( getParagraph(10, met.getAh() , smallFont) );
		document.add( new Paragraph("\n") );		
		
		document.add( getParagraph(0, "Área Sul Oceânica", smallHeader) );

		document.add( getParagraph(5, "Sul de 30ºS", smallHeader) );
		document.add( getParagraph(10, "Oeste de 030ºW", smallHeader) );
		document.add( new Paragraph("") );
		document.add( getParagraph(10, met.getS30o30() , smallFont) );
		document.add( new Paragraph("\n") );		
		
		document.add( getParagraph(10, "Leste de 030ºW", smallHeader) );
		document.add( new Paragraph("") );
		document.add( getParagraph(10, met.getS30l30() , smallFont) );
		document.add( new Paragraph("\n") );		

		document.add( getParagraph(5, "Entre 25ºS 30ºE", smallHeader) );
		document.add( new Paragraph("") );
		document.add( getParagraph(10, met.getE25e30() , smallFont) );
		document.add( new Paragraph("\n") );		

		
		document.add( getParagraph(5, "Norte de 25ºS", smallHeader) );
		document.add( new Paragraph("") );
		document.add( getParagraph(10, met.getN25() , smallFont) );
		document.add( new Paragraph("\n") );		

		
		document.add( getParagraph(0, "Área Norte Oceânica", smallHeader) );
		document.add( new Paragraph("") );
		document.add( getParagraph(10, met.getAno() , smallFont) );
		document.add( new Paragraph("\n") );		
		
		document.close();
		writer.close();
		return pdfName;
	}
	

}
