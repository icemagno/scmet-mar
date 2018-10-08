package br.mil.mar.casnav.mclm.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="avisos") 
public class Aviso {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_aviso")
	private int idAviso;
	
	@Column(length=100, name = "area")
	private String area;
	
	@Column(length=50, name = "numero")
	private String numero;
	
	@Column(length=100, name = "titulo")
	private String titulo;
	
	@Column(columnDefinition = "TEXT")
	private String texto;
	
	@Column(length=100, name = "validade")
	private String validade;
	
	@Column(length=250, name = "complemento")
	private String complemento;
	
	@Transient
	private String geometria;
	
	@Column(length=100, name = "emissao")
	private String emissao;

	public Aviso() {
		//
	}
	
	public Aviso(String area, String numero, String titulo, String texto, String validade, String complemento,
			String geometria, String emissao) {
		this.area = area;
		this.numero = numero;
		this.titulo = titulo;
		this.texto = texto;
		this.validade = validade;
		this.complemento = complemento;
		this.geometria = geometria;
		this.emissao = emissao;
	}	
	
	
	public String getNumero() {
		return numero;
	}
	
	public void setNumero(String numero) {
		this.numero = numero;
	}
	
	public String getTitulo() {
		return titulo;
	}
	
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	
	public String getTexto() {
		return texto;
	}
	
	public void setTexto(String texto) {
		this.texto = texto;
	}
	
	public String getValidade() {
		return validade;
	}
	
	public void setValidade(String validade) {
		this.validade = validade;
	}
	
	public String getComplemento() {
		return complemento;
	}
	
	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}
	
	public String getGeometria() {
		return geometria;
	}
	
	public void setGeometria(String geometria) {
		this.geometria = geometria;
	}
	
	public String getEmissao() {
		return emissao;
	}
	
	public void setEmissao(String emissao) {
		this.emissao = emissao;
	}


	public int getIdAviso() {
		return idAviso;
	}


	public void setIdAviso(int idAviso) {
		this.idAviso = idAviso;
	}


	public String getArea() {
		return area;
	}


	public void setArea(String area) {
		this.area = area;
	}

	
	
}
