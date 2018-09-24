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
	
	@Column(length=250, name = "texto")
	private String texto;

	@Column(length=250, name = "arquivo")
	private String arquivo;

	
	@Column(length=100, name = "data_analise_p2")
	private String dataAnaliseP2;
	
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
}
