const constantes = {

    smvm: 67743,

    cbv: 152515,

    auto: 3428000,

    miami: 1265990000,

    anio: 13,

};

let dolar_blue = 372;

let datos_ingresos_local = [];

const datos_ingresos_local_local = localStorage.getItem("array");

if (datos_ingresos_local_local !== null){
    
    datos_ingresos_local = JSON.parse(datos_ingresos_local_local);

    };

let nombre_local = localStorage.getItem("nombre");

validarpush(nombre_local, datos_ingresos_local);

let sueldo_neto_local = localStorage.getItem("sueldo");

validarpush(sueldo_neto_local, datos_ingresos_local);

let email_local = localStorage.getItem("email");

validarpush(email_local, datos_ingresos_local);

localStorage.setItem("array", JSON.stringify(datos_ingresos_local));

console.log(datos_ingresos_local);

const boton_calcular = document.getElementById("boton_calcular");

boton_calcular.addEventListener("click", function(event){

    event.preventDefault();

    let boton_anuncio = document.getElementById("boton_anuncios");

    if (boton_anuncio){

        boton_anuncio.remove();
    
    };

    let div_ads = document.getElementById("div_ads");

    let nodo_padre = div_ads.parentNode;

    let formulario = document.createElement("div")

    formulario.className = "container-fluid text-center";

    formulario.id = "formulario_id";

    formulario.innerHTML = `<form>
                                <div class="mb-3">
                                    <label for="nombre" class="form-label">Nombre</label>
                                    <input type="text" class="nombre form-control text-center" required>
                                </div>
                                <div class="mb-3">
                                    <label for="ingreso" class="form-label">Ingresar sueldo bruto</label>
                                    <input type="number" class="ingreso form-control text-center" required>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Correo electrónico</label>
                                    <input type="email" class="email form-control text-center" required>
                                </div>
                                <div>
                                    <button type="submit" id="boton_enviar" class="btn btn-outline-dark btn-lg">Enviar</button></button>
                                </div>
                            </form>`;

    nodo_padre.replaceChild(formulario, div_ads)

    if (boton_calcular && formulario){

        volver_al_inicio = document.createElement("div")

        volver_al_inicio.innerHTML = `<a href=""><button type="submit" class="btn btn-outline-dark btn-lg">Volver al inicio</button></button></a>`;

        boton_calcular.replaceWith(volver_al_inicio);

    };

    const boton_enviar = document.getElementById("boton_enviar");

    boton_enviar.addEventListener("click", function(event){

        event.preventDefault();

        let nombre = document.getElementsByClassName("nombre")[0].value;

        let ingreso = document.getElementsByClassName("ingreso")[0].value;

        let email = document.getElementsByClassName("email")[0].value;

            if(nombre.length > 0 && ingreso > 0 && email.includes("@")){

            let div_ads_1 = document.getElementById("div_ads_1");

            let nodo_padre_1 = div_ads_1.parentNode;
    
            let formulario_1 = document.createElement("form")
    
            formulario_1.className = "container-fluid text-center";
    
            formulario_1.innerHTML = `<div id="mostrar_sueldo" class="div_mostrar">
                    
                                      </div>
                                      <div id="mostrar_smvm" class="div_mostrar">
    
                                      </div>
                                      <div id="mostrar_cbv" class="div_mostrar">
    
                                      </div>
                                      <div id="mostrar_auto" class="div_mostrar">
    
                                      </div>
                                      <div id="mostrar_miami" class="div_mostrar">
    
                                      </div>`;
    
            nodo_padre_1.replaceChild(formulario_1, div_ads_1)

            let porcentaje = retenciones(ingreso);

            let sueldo_neto = calc_sueldo_neto(ingreso, porcentaje);

            let dif_smvm = calc_dif (sueldo_neto, constantes);

            let dif_cbv = calc_dif_1 (sueldo_neto, constantes);

            let sueldos_auto = calc_sueldos (sueldo_neto, constantes);

            let sueldos_miami = calc_sueldos_1 (sueldo_neto, constantes);

            let sueldos_anios = calc_meses_anios (constantes, sueldos_auto);

            let sueldos_anios_1 = calc_meses_anios (constantes, sueldos_miami)


            let mostrar_sueldo = document.createElement("p");

            mostrar_sueldo.innerHTML = `${nombre}, tu sueldo neto es de: $${sueldo_neto}.`;

            document.getElementById("mostrar_sueldo").innerHTML = '';

            document.getElementById("mostrar_sueldo").appendChild(mostrar_sueldo);


            let mostrar_smvm = document.createElement("p");

            mostrar_smvm.innerHTML = `La diferencia con el SMVM es de: $${dif_smvm}. El Sueldo Mínimo, Vital y Móvil es de: $${constantes.smvm}.`;

            document.getElementById("mostrar_smvm").innerHTML = '';

            document.getElementById("mostrar_smvm").appendChild(mostrar_smvm);


            let mostrar_cbv = document.createElement("p");

            mostrar_cbv.innerHTML = `La diferencia con el CBV es de: $${dif_cbv}. La Canasta Básica Vigente tiene un valor de: $${constantes.cbv}.`;

            document.getElementById("mostrar_cbv").innerHTML = '';

            document.getElementById("mostrar_cbv").appendChild(mostrar_cbv);


            let mostrar_auto = document.createElement("p");

            mostrar_auto.innerHTML = `Necesitas un total de ${sueldos_auto} meses para comprar el auto 0km más barato del mercado (${sueldos_anios} años). El Toyota Etios es el auto más barato del mercado con un valor de $${constantes.auto}, podés verlo <a target="_blank" href="https://auto.mercadolibre.com.ar/MLA-899841591-toyota-etios-15-x-5p-_JM#position=2&search_layout=grid&type=item&tracking_id=265f10c1-c8a8-4d2d-b907-0d75054bb4b6">aquí<a/>.`;

            document.getElementById("mostrar_auto").innerHTML = '';

            document.getElementById("mostrar_auto").appendChild(mostrar_auto);


            let mostrar_miami = document.createElement("p");

            mostrar_miami.innerHTML = `Necesitas un total de ${sueldos_miami} meses para comprar una mansión en Miami, si, lamentablemente serían ${sueldos_anios_1} años. Si te le animás <a target="_blank" href="https://mansionesmiami.com/property/5420-sw-72nd-ave-miami-fl-33155-a11343433/">acá<a/> podes verla.`;

            document.getElementById("mostrar_miami").innerHTML = '';

            document.getElementById("mostrar_miami").appendChild(mostrar_miami);

            document.getElementsByClassName("ingreso")[0].value = '';

            document.getElementsByClassName("nombre")[0].value = '';

            
            let mostrar_deducciones = ingreso - sueldo_neto;

            let formulario_id = document.getElementById("formulario_id");

            let deducciones = document.createElement("div")

            deducciones.className = "container-fluid text-center";

            deducciones.innerHTML = `<div class="div_mostrar">
                                     <p>Sueldo Bruto<p/>
                                     <p>$${ingreso}<p/>
                                     </div>
                                     <div class="div_mostrar">
                                     <p>Deducciones Totales<p/>
                                     <p>$${mostrar_deducciones}<p/>
                                     </div>
                                     <div class="div_mostrar">
                                     <p><a class="volver_al_inicio" href="">Volver al inicio</a><p/>
                                     </div>`;

            formulario_id.replaceWith(deducciones);

            localStorage.setItem("nombre", (nombre));

            localStorage.setItem("sueldo", (sueldo_neto));

            localStorage.setItem("email", (email));

            }
            else if(nombre.length === 0 || ingreso < 0 || !email.includes("@")){

                let ads_eliminar = document.getElementById("div_ads_1");

                ads_eliminar.remove();

                mensaje_error = document.createElement("div");

                mensaje_error.className = "div_mostrar";

                mensaje_error.innerHTML = `Los datos son incorrectos. Por favor vuelva a iniciar la acción y verifique los datos a ingresar.`;

                let article_padre = document.getElementById("article_ads");

                article_padre.appendChild(mensaje_error);

                document.getElementById("article_ads_1").appendChild(mensaje_error);


                let formulario_id = document.getElementById("formulario_id");

                let volver_al_inicio = document.createElement("div")

                volver_al_inicio.className = "container-fluid text-center div_mostrar";

                volver_al_inicio.innerHTML = `<p><a class="volver_al_inicio" href="">Volver al inicio</a><p/>`;

                formulario_id.replaceWith(volver_al_inicio);
                            
            };

        });

});

const boton_historial = document.getElementById("boton_historial");

boton_historial.addEventListener("click", function(event){

    event.preventDefault();

    let boton_anuncio = document.getElementById("boton_anuncios");

    if (boton_anuncio){

        boton_anuncio.remove();
    
    };

    let main = document.getElementById("main");

    let article_eliminar = document.getElementById("article_ads");

    article_eliminar.remove();

    let article_eliminar_1 = document.getElementById("article_ads_1");

    article_eliminar_1.remove();

    let nodo_hijo = main.childNodes;

    let cantidad_mostrar = ((datos_ingresos_local.length)/3) - 1;

    let volver_al_inicio = document.createElement("div");

    volver_al_inicio.className = "div_mostrar container-fluid text-center col-10";

    volver_al_inicio.innerHTML = `<p><a class="volver_al_inicio" href="">Volver al inicio</a><p/>`;

    main.appendChild(volver_al_inicio);

    let ii = 0;

    for(let i = 0; i <= cantidad_mostrar; i++){

        let mostrar_historial = document.createElement("div");

        mostrar_historial.setAttribute("id", "mostrar-" + i)

        mostrar_historial.className = "div_mostrar container-fluid text-center col-10";

        let mostrar_historial_i = document.createElement("p");

        mostrar_historial_i.className = "text-center";

        mostrar_historial_i.innerHTML = `Nombre: ${datos_ingresos_local[ii]} - sueldo neto: ${datos_ingresos_local[ii+1]}`;

        main.insertBefore(mostrar_historial, nodo_hijo[i]);

        let historial = document.getElementById("mostrar-" + i);

        mostrar_historial_i.innerHTML = `Nombre: ${datos_ingresos_local[ii]} - sueldo neto: ${datos_ingresos_local[ii+1]}`;

        historial.appendChild(mostrar_historial_i);

        ii = ii + 3;

    };

    if (boton_calcular && volver_al_inicio){

        volver_al_inicio = document.createElement("div")

        volver_al_inicio.innerHTML = `<a href=""><button type="submit" class="btn btn-outline-dark btn-lg">Volver al inicio</button></button></a>`;

        boton_calcular.replaceWith(volver_al_inicio);

    };

});

const boton_vaciar = document.getElementById("boton_vaciar");

boton_vaciar.addEventListener("click", function(event){

    event.preventDefault();

    localStorage.clear();

    let cantidad_mostrar = (datos_ingresos_local.length)/3;

    let div_historial = document.getElementById("mostrar-1");

    if(div_historial){

        for(let i = 0; i<= cantidad_mostrar; i++){

            let divs_eliminar = document.getElementById("mostrar-" + i);

            divs_eliminar.remove();

        };

    };

});

const boton_anuncios = document.getElementById("boton_anuncios");

boton_anuncios.addEventListener("click", function(event){

    event.preventDefault();

    let ads = document.getElementById("div_ads");

    let ads1 = document.getElementById("div_ads_1");

    let adsfooter = document.getElementById("ads_footer");

    let adsfooter1 = document.getElementById("ads_footer_1");

    let nuevoads = document.createElement("div")

    nuevoads.innerHTML = `<div id="div_ads">
                          
                          </div>`;

    ads.replaceWith(nuevoads);

    let nuevoads1 = document.createElement("div");

    nuevoads1.innerHTML = `<div id="div_ads_1">
                          
                           </div>`;

    ads1.replaceWith(nuevoads1);

    adsfooter.remove();

    adsfooter1.remove();

    let boton_anuncio = document.getElementById("boton_anuncios");

    boton_anuncio.remove();

});

function calc_sueldo_neto (ingreso, porcentaje){

    if(ingreso < 200000){

        return ingreso - (ingreso * porcentaje)

    }
    else if(ingreso <= 350000){

        return ingreso - (ingreso * porcentaje)

    }
    else{

        return ingreso - (ingreso * porcentaje)

    }

}

function retenciones (ingreso){

    if(ingreso < 200000){

        return 0.15

    }
    else if(ingreso <=  350000){

        return 0.25

    }
    else{

        return 0.35

    }

}

function calc_dif (sueldo_neto , constantes){

    return sueldo_neto - constantes.smvm

}

function calc_dif_1 (sueldo_neto , constantes){

    return sueldo_neto - constantes.cbv

}

function calc_sueldos (sueldo_neto, constantes){

    return parseFloat(constantes.auto / sueldo_neto).toFixed(1)

}

function calc_sueldos_1 (sueldo_neto, constantes){

    return parseFloat(constantes.miami / sueldo_neto).toFixed(1)

}

function calc_meses_anios (constantes, sueldos_auto){

    return parseFloat(sueldos_auto / constantes.anio).toFixed(2)

}

function validarpush (nombre_local, datos_ingresos_local){

    if(nombre_local !== null){

        datos_ingresos_local.push(nombre_local);

    };

};