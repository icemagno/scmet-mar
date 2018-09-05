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
	
	@Transient
	private List<Aviso> parteUm;

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
	
	public void generate() {
		System.out.println( texto );
		
		System.out.println("Parte Um : ");
		for ( Aviso aviso : parteUm ) {
			System.out.println( "  > " + aviso.getTitulo() );
		}
		
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
