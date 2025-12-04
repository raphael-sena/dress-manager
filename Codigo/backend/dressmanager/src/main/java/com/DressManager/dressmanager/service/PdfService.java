package com.DressManager.dressmanager.service;

import org.springframework.stereotype.Service;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Service
public class PdfService {
    public byte[] createPdf(
    String clientenome,
    String clienteCPF,
    String clienteRG,
    String clienteEndereco,
    String clienteTelefone,
    String clienteEmail,
    String produto,
    String valorVenda,
    String valorAluguel,
    String dataInicio,
    String dataEntrega) throws IOException {

    
    Document document = new Document();
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    try{
     PdfWriter.getInstance(document, byteArrayOutputStream);
    document.open();
    Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, BaseColor.BLACK); 
    Paragraph title = new Paragraph("CONTRATO DE LOCAÇÃO DE VESTIDOS E/OU ACESSÓRIOS", titleFont);
    title.setAlignment(Element.ALIGN_CENTER);
    document.add(title); 
    // Adiciona seções e cláusulas 
    addSectionTitle(document, "1. DAS PARTES"); 
    addParagraph(document, "LOCADORA: Wanir de Sena Comércio de Roupas e Acessórios LTDA, com sede em Belo Horizonte, na Rua José Oscar Barreira 1221, Planalto, CEP 31,720-420, Belo Horizonte, MG inscrita no CNPJ sob o nº 09.570.194/0001-35, inscrição estadual nº 001.071639.00-86;"); 
    addParagraph(document, "\nLOCATÁRIA:\nNome: "+clientenome+"\nCPF: "+clienteCPF+"\nRG: "+clienteRG+"\nEndereço: "+clienteEndereco+"\nTelefones: "+clienteTelefone+"\nEmail: "+clienteEmail+"\n");
    addParagraph(document, "\nAs partes identificadas acima têm, entre si, justo e acertado o presente Contrato de Locação de Artigos de Vestuário e Acessórios, que reger-se-á pelas cláusulas seguintes e pelas condições de preço, forma e termos de pagamento descritos no presente Contrato de Locação.\n");

    
    addSectionTitle(document, "\n2. DO OBJETO");
    addParagraph(document, "CLÁUSULA PRIMEIRA - O objeto do presente contrato é a locação por prazo certo e determinado de vestido(s) e/ou acessório(s) de propriedade única e exclusiva da LOCADORA, disponibilizado(s) à LOCATÁRIA."); 
    addParagraph(document, "CLÁUSULA SEGUNDA - A locação terá início às 14 (quatorze) horas e término às 18 (dezoito) horas dos respectivos dias marcados. Toda locação terá fim até as 18 (dezoito) horas dos dias determinados.\n");
    
    
    addSectionTitle(document, "3. DO VALOR E DA FORMA DE PAGAMENTO DA LOCAÇÃO"); 
    addParagraph(document, "CLÁUSULA TERCEIRA - O valor da Locação é previamente informado à LOCATÁRIA no ato da contratação, de acordo com o valor do aluguel do(s) Produto(s), o prazo da Locação, a forma e o local de entrega e a forma e o local de devolução do(s) Produto(s). É de responsabilidade única e exclusiva da LOCATÁRIA a escolha do(s) Produto(s), do prazo de Locação, da forma e do local de entrega e a forma de devolução do(s) Produto(s) locado(s), cujo custo do respectivo frete de entrega e/ou devolução poderá ser acrescido ao valor da Locação."); 
    addParagraph(document, "CLÁUSULA QUARTA - Para efetivação da contratação da Locação pretendida, a LOCATÁRIA deverá realizar o pagamento do valor total da Locação do(s) Produto(s), através de cartão de crédito, débito ou dinheiro, sendo que independente da forma de pagamento, os dados de um cartão de crédito vigente e com limite disponível acima do valor da peça deverão ser disponibilizados à LOCADORA para utilização em caso de cobranças extras decorrentes da Locação."); 
    addParagraph(document, "CLÁUSULA QUINTA - A LOCADORA reserva o direito de solicitar um cheque caução ou de efetuar uma pré-autorização no cartão de crédito da LOCATÁRIA caso julgue necessário, levando em consideração o valor integral do produto e o prazo de locação."); 
    
    addSectionTitle(document, "4. DO PRAZO DA LOCAÇÃO"); 
    addParagraph(document, "CLÁUSULA SEXTA - O prazo da Locação será aquele escolhido pela LOCATÁRIA no ato da contratação, de acordo com as opções disponibilizadas pela LOCADORA."); 
    addParagraph(document, "CLÁUSULA SÉTIMA - É facultado à LOCATÁRIA solicitar por e-mail ou telefone a extensão do prazo de Locação do(s) Produto(s) à LOCADORA, que aprovará ou não tal solicitação, de acordo com a disponibilidade do(s) Produto(s) e mediante o pagamento do valor do aluguel adicional decorrente da extensão do prazo da Locação.\n");
    
    addSectionTitle(document, "5. DA ENTREGA DO(S) PRODUTO(S) LOCADO(S)"); 
    addParagraph(document, "CLÁUSULA OITAVA - O(s) Produto(s) locado(s) será(ão) entregue(s) pela LOCADORA à LOCATÁRIA limpo(s), em adequado estado de conservação e pronto(s) para utilização, na forma e na data solicitada até às 18hs (dezoito horas) do dia acordado, sendo certo que, caso a LOCADORA venha a realizar a entrega antecipada àquela solicitada pela LOCATÁRIA, não haverá qualquer cobrança adicional."); 
    addParagraph(document, "CLÁUSULA NONA - A LOCATÁRIA assume a responsabilidade integral pela recepção do(s) Produto(s) locado(s) e declara estar ciente que caso o endereço de entrega não seja considerado seguro ou esteja sujeito a condições especiais de entrega de acordo com a definição dos Correios, poderá ocorrer atraso e eventuais taxas adicionais para efetivação da entrega, cujos eventuais custos adicionais serão cobrados e deverão ser arcados pela LOCATÁRIA."); 
    addParagraph(document, "CLÁUSULA DÉCIMA - Na eventual impossibilidade da entrega do(s) Produto(s) locado(s), o valor do aluguel será integralmente restituído à LOCATÁRIA.\n");


    addSectionTitle(document, "6. DAS OBRIGAÇÕES E RESPONSABILIDADES DA LOCATÁRIA"); 
    addParagraph(document, "CLÁUSULA DÉCIMA PRIMEIRA – Ao prover seus dados para registro, a LOCATÁRIA compromete-se que todos os dados são verdadeiros."); 
    addParagraph(document, "CLÁUSULA DÉCIMA PRIMEIRA - Após o recebimento, a LOCATÁRIA assume o compromisso e a responsabilidade pela guarda, cuidado e utilização com zelo do(s) Produto(s) locado(s), como se fosse(m) de sua propriedade, responsabilizando-se por eventual perda, destruição, manchas e/ou quaisquer danos que ocorram com o(s) Produto(s) durante o tempo no qual estiver em posse do produto, salvo o desgaste natural decorrente da sua utilização normal. É expressamente proibido à LOCATÁRIA lavar o(s) Produto(s) locado(s)."); 
    addParagraph(document, "CLÁUSULA DÉCIMA SEGUNDA - Diante da responsabilidade assumida na cláusula décima primeira acima, a LOCATÁRIA desde já concorda em reparar todos e quaisquer danos eventualmente causados ao(s) Produto(s) da LOCADORA, e, para tanto, autoriza desde já, que os valores decorrentes da reparação do(s) dano(s) causados ao(s) Produto(s), sejam descontados do cartão de crédito fornecido ou daquele utilizado para a realização da Locação. Se o valor de reparação dos danos for superior ao valor da peça, ou na hipótese de dano irreparável, perda ou roubo, será devido e cobrado pela LOCADORA à LOCATÁRIA, o valor de varejo do(s) Produto(s), valor este calculado levando em consideração a dificuldade de reposição da peça, exclusividade e tempo no qual a peça teve que permanecer sem ser locada. Na hipótese de dano irreparável a LOCATÁRIA poderá permanecer com o(s) produto(s) danificado após o pagamento integral do(s) produto(s) para a LOCADORA.\n");

 
    addSectionTitle(document, "7. DA DEVOLUÇÃO DO(S) PRODUTO(S) LOCADO(S)");
    addParagraph(document, "CLÁUSULA DÉCIMA TERCEIRA - A LOCATÁRIA se compromete e responsabiliza a realizar a devolução do(s) Produto(s) locado(s), da forma escolhida no ato da contratação da Locação, sob pena da incidência das multas estabelecidas no item 8, abaixo."); 
    addParagraph(document, "CLÁUSULA DÉCIMA QUARTA - A devolução deverá ser realizada utilizando o mesmo envelope, capa e cabide e/ou sacola nos quais o(s) produto(s) chegou(aram) à LOCATÁRIA da seguinte forma:");
    addParagraph(document, "PARÁGRAFO PRIMEIRO - Devolução no Atelier: A LOCATÁRIA poderá realizar a devolução do(s) Produto(s) locado(s), juntamente com o envelope, cabide e saco diretamente no Atelier da LOCADORA, até às 18hs (dezoito horas) da data do término do prazo da Locação;");
    addParagraph(document, "PARÁGRAFO SEGUNDO - Coleta no Endereço de Entrega: A LOCATÁRIA poderá realizar a devolução através da solicitação no ato da contratação de coleta do(s) Produto(s) locado(s) no endereço de entrega. Para tanto, a LOCATÁRIA deverá disponibilizar o(s) Produto(s) para retirada no local da entrega, em horário comercial (das 9hs às 18hs) na data do término do prazo da Locação ao responsável pela coleta (Correios ou prestador de serviço de logística ou profissional da LOCADORA). Caso o(s) Produto(s) não esteja(m) disponível(is) para retirada na data determinada, a LOCATÁRIA ficará sujeita ao pagamento de nova taxa de frete para o reagendamento da coleta, e à multa correspondente a uma diária da Locação, por cada dia de atraso, cujo valor será cobrado diretamente do cartão de crédito da LOCATÁRIA ou daquele utilizado para a realização da Locação.");
    addParagraph(document,"CLÁUSULA DÉCIMA QUINTA - Caso a LOCATÁRIA perca o envelope enviado juntamente com o(s) Produto(s) locado(s) e opte por realizar a devolução em uma das formas indicadas nas cláusulas  acima, a LOCATÁRIA deverá informar a LOCADORA por e-mail ou telefone e realizar a devolução do(s) Produto(s) através de embalagem adequada, informando o respectivo código de rastreamento, sob pena da multa indicada o item 8 abaixo.");
    
    addSectionTitle(document, "8. DO ATRASO NA DEVOLUÇÃO DO(S) PRODUTO(S) LOCADO(S)");
    addParagraph(document,"CLÁUSULA DÉCIMA SEXTA - A LOCATÁRIA se compromete a informar imediatamente a LOCADORA, todo e qualquer possível atraso que possa ocorrer na devolução do(s) Produto(s) locado(s), via e-mail ou telefone, para que possa ser verificada a possibilidade de extensão da Locação como indicado na cláusula sétima, acima.");
    addParagraph(document,"CLÁUSULA DÉCIMA SÉTIMA - Caso a extensão do prazo da Locação não seja possível, o atraso na devolução do(s) Produto(s) locado(s) acarretará a cobrança pela LOCADORA de multa correspondente ao valor proporcional a 02 (duas) diárias da Locação realizada, por dia de atraso, cujo valor será cobrado diretamente do cartão de crédito da LOCATÁRIA ou daquele utilizado para a realização da Locação.");
    addParagraph(document,"CLÁUSULA DÉCIMA OITAVA - Fica estabelecido que caso o atraso na devolução do(s) Produto(s) locado(s) seja superior a 05 (cinco) dias, será devido pela LOCATÁRIA à LOCADORA o valor de varejo do(s) Produto(s), que será cobrado na forma indicada na cláusula décima segunda acima, sem prejuízo do procedimento de coleta indicado na cláusula décima quarta acima.");
    
    addSectionTitle(document, "9. DO CANCELAMENTO DA LOCAÇÃO");
    addParagraph(document,"CLÁUSULA DÉCIMA NONA - A LOCATÁRIA poderá realizar a solicitação de cancelamento da Locação, via e-mail ou telefone, no prazo de até 72 (setenta e duas) horas de antecedência da data acordada para a retirada/entrega do(s) Produto(s) locado(s). Nesta hipótese a LOCATÁRIA poderá optar:");


    addSectionTitle(document, "9. DO CANCELAMENTO DA LOCAÇÃO"); 
    addParagraph(document, "CLÁUSULA DÉCIMA NONA - A LOCATÁRIA poderá realizar a solicitação de cancelamento da Locação, via e-mail ou telefone, no prazo de até 72 (setenta e duas) horas de antecedência da data acordada para a retirada/entrega do(s) Produto(s) locado(s). Nesta hipótese a LOCATÁRIA poderá optar:"); 
    addParagraph(document, "PARÁGRAFO ÚNICO – Pelo crédito em mercadoria da própria loja e ou locação da mesma peça ou outra peça em datas posteriores à acordada anteriormente.\n"); 
    addParagraph(document, "CLÁUSULA VIGÉSIMA - A troca do(s) Produto(s) locado(s) poderá ser realizada uma única vez e somente se a solicitação de troca for realizada pela LOCATÁRIA via e-mail ou telefone, na mesma data de recebimento do(s) Produto(s) locado(s).\n"); 
    addParagraph(document, "CLÁUSULA VIGÉSIMA PRIMEIRA - Para efetivação da troca, a LOCATÁRIA deverá devolver o(s) Produto(s) locado(s) à LOCADORA em até 24 (vinte e quatro) horas (exceto domingos e feriados) da data de entrega do(s) Produto(s)."); 
    addParagraph(document, "PARÁGRAFO ÚNICO - Após o recebimento e verificação da não utilização do(s) Produto(s), a LOCADORA emitirá um voucher com crédito do valor da respectiva Locação, para utilização pela LOCATÁRIA em uma nova Locação no prazo de até 12 (doze) meses da data de sua emissão, sendo certo que, caso a LOCADORA verifique que o(s) Produto(s) foi(ram) utilizado(s), não haverá a emissão de voucher.\n"); 
    
    
    addSectionTitle(document, "11. DAS DISPOSIÇÕES GERAIS"); 
    addParagraph(document, "CLÁUSULA VIGÉSIMA SEGUNDA - Este Contrato, incluindo os Termos e Condições e a Política de Privacidade do Site constitui o acordo integral entre as partes."); 
    addParagraph(document, "CLÁUSULA VIGÉSIMA TERCEIRA - Ao postar fotos em redes sociais utilizando o(s) produto(s) locado(s), a LOCATÁRIA concede à LOCADORA o direito de uso irrestrito da sua imagem."); 
    addParagraph(document, "CLÁUSULA VIGÉSIMA QUARTA - A LOCADORA não é responsável e não pode ser responsabilizada por quaisquer postagens ou uso indevido de seu nome e/ou logomarca em sites e redes sociais que não as suas próprias."); 
    addParagraph(document, "CLÁUSULA VIGÉSIMA QUINTA - Se qualquer disposição deste Contrato for considerada ilegal, inválida ou em conflito com qualquer lei de qualquer autoridade que tenha jurisdição sobre o presente Contrato, a validade das demais disposições permanecerão válidas em pleno vigor e efeito."); 
    addParagraph(document, "CLÁUSULA VIGÉSIMA SEXTA - A responsabilidade da LOCADORA por eventual falha na entrega do(s) Produto(s) é limitada ao valor da Locação, razão pela qual a LOCADORA não será responsável por eventuais danos diretos ou indiretos decorrentes da Locação objeto deste contrato, em qualquer hipótese.");
    addParagraph(document, "CLÁUSULA VIGÉSIMA SÉTIMA - Todas as cobranças decorrentes do presente Contrato estão sujeitas a protesto e a inclusão do nome do devedor nos cadastros dos órgãos de proteção ao crédito, sendo que os custos decorrentes de cobranças, incluindo, sem limitação, honorários advocatícios, serão de responsabilidade do devedor."); 
    addParagraph(document, "CLÁUSULA VIGÉSIMA OITAVA - Em caso de violação de qualquer disposição deste Contrato, a LOCADORA reserva-se o direito de não realizar novas locações à LOCATÁRIA inadimplente, bem como o de alterar ou cancelar o presente Contrato a qualquer momento, a seu exclusivo critério."); 
    addParagraph(document, "CLÁUSULA VIGÉSIMA NONA - As Partes elegem o Foro de Belo Horizonte, como o competente para dirimir quaisquer dúvidas oriundas do presente contrato, com exclusão de qualquer outro, por mais privilegiado que possa ser."); 
    addParagraph(document, "CLÁUSULA TRIGÉSIMA - Peças entregues com sujo excessivo, será cobrado uma taxa no valor de R$ 80,00 para lavagem e caso este sujo venha a danificá-la, será cobrado o valor de venda da mesma.\n"); 
    addParagraph(document, "Objeto de locação: "+produto);
    addParagraph(document, "Valor de venda: R$ "+valorVenda);
    addParagraph(document, "Valor da locação: R$ "+ valorAluguel);
    addParagraph(document, "Data de Retirada: "+dataInicio);
    addParagraph(document, "Data de Devolução: "+dataEntrega);
    addParagraph(document, "\nOBS:____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________\n");


    addParagraph(document, "\nPor estarem assim justos e contratados, firmam o presente instrumento, em duas vias de igual teor, juntamente com 2 (duas) testemunhas.");
    addParagraph(document, "Belo Horizonte, "+getDataAtual()); 
    addParagraph(document, "\nNome e assinatura do LOCATÁRIO:");
    addParagraph(document, "\n_______________________________________________________________");
    addParagraph(document, "\n_______________________________________________________________");
    addParagraph(document, "\nNome e assinatura da LOCADORA:");
    addParagraph(document, "\n_______________________________________________________________");
    addParagraph(document, "\n_______________________________________________________________");
    addParagraph(document, "\nTestemunhas: ");
    addParagraph(document, "\n_______________________________________________________________");
    addParagraph(document, "\n_______________________________________________________________");

    document.close(); 
}
 catch (Exception e) { 
    System.out.println(e); 
}
finally{
    document.close();
} 
return byteArrayOutputStream.toByteArray();
}
    // try {
    //     PdfWriter.getInstance(document, byteArrayOutputStream);
    //     document.open();
    //     // Adiciona título 
    //     Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, BaseColor.BLACK); 
    //     Paragraph title = new Paragraph("CONTRATO DE LOCAÇÃO DE VESTIDOS E/OU ACESSÓRIOS", titleFont);
        
    //     document.add(new Paragraph("Cliente: " + clientenome));
    //     document.add(new Paragraph("Data de Início: " + dataInicio));
    //     document.add(new Paragraph("Data de Entrega: " + dataEntrega));
    //     document.add(new Paragraph("Produto: " + produto));
    //     document.add(new Paragraph("Valor do alguel: " + valorAluguel));
    
        
    // } catch (Exception e) {
    //     System.out.println(e);
 

    // return byteArrayOutputStream.toByteArray();

    // }

    private static void addSectionTitle(Document document, String title) throws DocumentException { 
        Font sectionFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, BaseColor.BLACK); 
        Paragraph sectionTitle = new Paragraph(title, sectionFont); document.add(sectionTitle);
     } 
     private static void addParagraph(Document document, String text) throws DocumentException { 
        Font paragraphFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK); 
        Paragraph paragraph = new Paragraph(text, paragraphFont); document.add(paragraph); 
    }

private static String getDataAtual() { 
    LocalDate hoje = LocalDate.now(); 
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d 'de' MMMM 'de' yyyy", new Locale("pt", "BR")); 
    return hoje.format(formatter); }
}

