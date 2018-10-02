package br.mil.mar.casnav.mclm.persistence.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="meteoro") 
public class Meteoro {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_meteoro")
	private int idMeteoro;	
	
	@Column
	private Boolean ativo = true;

	@Column
	private Boolean rascunho = false;
	
	@Column(length=250, columnDefinition = "TEXT", name = "texto")
	private String texto;

	@Column(length=250, name = "arquivo")
	private String arquivo;

	@Column(columnDefinition = "TEXT")
	private String aa;		
	@Column(columnDefinition = "TEXT")
	private String ab;		
	@Column(columnDefinition = "TEXT")
	private String ac;		
	@Column(columnDefinition = "TEXT")
	private String ad;		
	@Column(columnDefinition = "TEXT")
	private String ae;		
	@Column(columnDefinition = "TEXT")
	private String af;		
	@Column(columnDefinition = "TEXT")
	private String ag;		
	@Column(columnDefinition = "TEXT")
	private String ah;
	@Column(columnDefinition = "TEXT")
	private String aso;		
	@Column(columnDefinition = "TEXT")
	private String ano;		
	
	
	@Column(columnDefinition = "TEXT")
	private String s30o30;		
	@Column(columnDefinition = "TEXT")
	private String s30l30;		
	@Column(columnDefinition = "TEXT")
	private String e25e30;		
	@Column(columnDefinition = "TEXT")
	private String n25;		
	
	
	
	
	@Column(length=100, name = "data_analise_p2")
	private String dataAnaliseP2;

	@Column(length=100, name = "texto_analise_p2")
	private String textoAnaliseP2;
	
	@Column(length=100, name = "validade_previsao_p3")
	private String validadePrevisaoP3;
	
	@Transient
	private List<Aviso> parteUm;

	public String getDataAnaliseP2() {
		return dataAnaliseP2;
	}

	public void setDataAnaliseP2(String dataAnaliseP2) {
		this.dataAnaliseP2 = dataAnaliseP2;
	}

	public String getValidadePrevisaoP3() {
		return validadePrevisaoP3;
	}

	public void setValidadePrevisaoP3(String validadePrevisaoP3) {
		this.validadePrevisaoP3 = validadePrevisaoP3;
	}

	public Meteoro() {
		
	}
	
	public Meteoro( String texto ) {
		this.texto = texto;
	}
	
	public List<Aviso> getParteUm() {
		return parteUm;
	}

	public void setParteUm(List<Aviso> parteUm) {
		this.parteUm = parteUm;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}
	
	public int getIdMeteoro() {
		return idMeteoro;
	}

	public void setIdMeteoro(int idMeteoro) {
		this.idMeteoro = idMeteoro;
	}

	public Boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}

	public String getArquivo() {
		return arquivo;
	}

	public void setArquivo(String arquivo) {
		this.arquivo = arquivo;
	}

	public String getTextoAnaliseP2() {
		return textoAnaliseP2;
	}

	public void setTextoAnaliseP2(String textoAnaliseP2) {
		this.textoAnaliseP2 = textoAnaliseP2;
	}

	public Boolean getRascunho() {
		return rascunho;
	}

	public void setRascunho(Boolean rascunho) {
		this.rascunho = rascunho;
	}

	public String getAa() {
		return aa;
	}

	public void setAa(String aa) {
		this.aa = aa;
	}

	public String getAb() {
		return ab;
	}

	public void setAb(String ab) {
		this.ab = ab;
	}

	public String getAc() {
		return ac;
	}

	public void setAc(String ac) {
		this.ac = ac;
	}

	public String getAd() {
		return ad;
	}

	public void setAd(String ad) {
		this.ad = ad;
	}

	public String getAe() {
		return ae;
	}

	public void setAe(String ae) {
		this.ae = ae;
	}

	public String getAf() {
		return af;
	}

	public void setAf(String af) {
		this.af = af;
	}

	public String getAg() {
		return ag;
	}

	public void setAg(String ag) {
		this.ag = ag;
	}

	public String getAh() {
		return ah;
	}

	public void setAh(String ah) {
		this.ah = ah;
	}

	public String getAso() {
		return aso;
	}

	public void setAso(String aso) {
		this.aso = aso;
	}

	public String getAno() {
		return ano;
	}

	public void setAno(String ano) {
		this.ano = ano;
	}

	public String getS30o30() {
		return s30o30;
	}

	public void setS30o30(String s30o30) {
		this.s30o30 = s30o30;
	}

	public String getS30l30() {
		return s30l30;
	}

	public void setS30l30(String s30l30) {
		this.s30l30 = s30l30;
	}

	public String getE25e30() {
		return e25e30;
	}

	public void setE25e30(String e25e30) {
		this.e25e30 = e25e30;
	}

	public String getN25() {
		return n25;
	}

	public void setN25(String n25) {
		this.n25 = n25;
	}
	
	
}
