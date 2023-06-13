import React, { } from 'react';
import './../../css/stylesTermosdeUso.css'
import { useNavigate } from 'react-router-dom';



function TermosDeUso() {
    const navigate = useNavigate();
    return(
        <div>
            <main>                
                <div className="conteinerTermosDeUso">

                    <div className="containerTituloTermosDeUso">
                        <h3>1. Termos</h3>
                    </div>

                    <div class="textoTermoDeUso">
                        <p>
                                Ao acessar ao site do Egresso, concorda em
                                cumprir estes termos de serviço, todas as leis e regulamentos
                                aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as
                                leis locais aplicáveis. Se você não concordar com algum desses termos,
                                está proibido de usar ou acessar este site. Os materiais contidos
                                neste site são protegidos pelas leis de direitos autorais e marcas
                                comerciais aplicáveis.
                        </p>
                    </div>

                    <div className="containerTituloTermosDeUso">
                        <h3 className="tituloTermoDeUso">2. Uso de Licença</h3>
                    </div>

                    <div class="textoTermoDeUso">
                        <p>
                                É concedida permissão para baixar temporariamente uma cópia dos
                                materiais (informações ou software) no site Egresso , apenas para
                                visualização transitória pessoal e não comercial. Esta é a concessão
                                de uma licença, não uma transferência de título e, sob esta licença,
                                você não pode:&nbsp;

                                <p>Modificar ou copiar os materiais;&nbsp;</p>

                                <p>
                                    Usar os materiais para qualquer finalidade comercial ou para
                                    exibição pública (comercial ou não comercial);&nbsp;
                                </p>

                                <p>
                                    Tentar descompilar ou fazer engenharia reversa de qualquer software
                                    contido no site Egresso;&nbsp;
                                </p>

                                <p>
                                    Remover quaisquer direitos autorais ou outras notações de
                                    propriedade dos materiais; ou&nbsp;
                                </p>

                                <p>
                                    Transferir os materiais para outra pessoa ou 'espelhe' os materiais
                                    em qualquer outro servidor.
                                </p>

                                <p>
                                Esta licença será automaticamente rescindida se você violar alguma
                                dessas restrições e poderá ser rescindida por Egresso a qualquer
                                momento. Ao encerrar a visualização desses materiais ou após o término
                                desta licença, você deve apagar todos os materiais baixados em sua
                                posse, seja em formato eletrónico ou impresso.
                        </p>
                        </p>
                    </div>

                    <div className="containerTituloTermosDeUso">
                        <h3 className="tituloTermoDeUso">3. Isenção de responsabilidade</h3>
                    </div>

                    <div class="textoTermoDeUso">
                                <p>
                                    Os materiais no site da Egresso são fornecidos 'como estão'. Egresso
                                    não oferece garantias, expressas ou implícitas, e, por este meio,
                                    isenta e nega todas as outras garantias, incluindo, sem limitação,
                                    garantias implícitas ou condições de comercialização, adequação a um
                                    fim específico ou não violação de propriedade intelectual ou outra
                                    violação de direitos.
                                </p>
                                <p>
                                    Além disso, o Egresso não garante ou faz qualquer representação
                                    relativa à precisão, aos resultados prováveis ​​ou à confiabilidade
                                    do uso dos materiais em seu site ou de outra forma relacionado a
                                    esses materiais ou em sites vinculados a este site.
                                </p>
                    </div>

                    <div className="containerTituloTermosDeUso">
                        <h3 className="tituloTermoDeUso">4. Limitações</h3>
                    </div>
                    <div class="textoTermoDeUso">
                        <p>
                                Em nenhum caso o Egresso ou seus fornecedores serão responsáveis ​​por
                                quaisquer danos (incluindo, sem limitação, danos por perda de dados ou
                                lucro ou devido a interrupção dos negócios) decorrentes do uso ou da
                                incapacidade de usar os materiais em Egresso, mesmo que Egresso ou um
                                representante autorizado da Egresso tenha sido notificado oralmente ou
                                por escrito da possibilidade de tais danos. Como algumas jurisdições
                                não permitem limitações em garantias implícitas, ou limitações de
                                responsabilidade por danos conseqüentes ou incidentais, essas
                                limitações podem não se aplicar a você.
                        </p>
                    </div>

                    <div className="containerTituloTermosDeUso">
                        <h3 className="tituloTermoDeUso">5. Precisão dos materiais</h3>
                    </div>
                    <div class="textoTermoDeUso">
                        <p>
                                Os materiais exibidos no site da Egresso podem incluir erros técnicos,
                                tipográficos ou fotográficos. Egresso não garante que qualquer
                                material em seu site seja preciso, completo ou atual. Egresso pode
                                fazer alterações nos materiais contidos em seu site a qualquer
                                momento, sem aviso prévio. No entanto, Egresso não se compromete a
                                atualizar os materiais.
                        </p>
                    </div>
                    <div className="containerTituloTermosDeUso">
                        <h3 className="tituloTermoDeUso">6. Links</h3>
                    </div>
                    <div class="textoTermoDeUso">
                        <p>
                                O Egresso não analisou todos os sites vinculados ao seu site e não é
                                responsável pelo conteúdo de nenhum site vinculado. A inclusão de
                                qualquer link não implica endosso por Egresso do site. O uso de
                                qualquer site vinculado é por conta e risco do usuário.
                        </p>
                    </div>
                    <div className="containerTituloTermosDeUso">
                        <h3 className="tituloTermoDeUso">Modificações</h3>
                    </div>
                    <div class="textoTermoDeUso">
                        <p>
                                O Egresso pode revisar estes termos de serviço do site a qualquer
                                momento, sem aviso prévio. Ao usar este site, você concorda em ficar
                                vinculado à versão atual desses termos de serviço.
                        </p>
                    </div>
                    <div className="containerTituloTermosDeUso">
                        <h3 className="tituloTermoDeUso">Lei aplicável</h3>
                    </div>
                    <div class="textoTermoDeUso">
                        <p>
                                Estes termos e condições são regidos e interpretados de acordo com as
                                leis do Egresso e você se submete irrevogavelmente à jurisdição
                                exclusiva dos tribunais naquele estado ou localidade.
                        </p>
                    </div>
                    <div className="marginBottom">
                        
                    </div>
                </div>
            </main>
        </div>
    )
}
export default TermosDeUso;