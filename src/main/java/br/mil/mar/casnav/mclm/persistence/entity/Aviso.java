package br.mil.mar.casnav.mclm.persistence.entity;

public class Aviso {
	private String id;
	private String numero;
	private String titulo;
	private String texto;
	private String validade;
	private String complemento;
	private String geometria;
	private String emissao;

	public Aviso(String id, String numero, String titulo, String texto, String validade, String complemento,
			String geometria, String emissao) {
		this.id = id;
		this.numero = numero;
		this.titulo = titulo;
		this.texto = texto;
		this.validade = validade;
		this.complemento = complemento;
		this.geometria = geometria;
		this.emissao = emissao;
	}	
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
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
	
}
