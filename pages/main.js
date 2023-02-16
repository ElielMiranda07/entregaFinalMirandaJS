const constantes = {

    smvm: 67743,

    cbv: 152515,

    auto: 3428000,

    miami: 1265990000,

    anio: 13,

};

/*function Nombre_sueldo_email(nombre, sueldo, email){

    this.nombre = nombre;

    this.sueldo = sueldo;

    this.email = email

}

let nombres_sueldos = [];*/

const boton_calcular = document.getElementById("boton_calcular");

boton_calcular.addEventListener("click", function(event){

    event.preventDefault();

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

    /*let nombres_sueldos_local = JSON.parse(localStorage.getItem("nombresysueldos"));

    nombres_sueldos_local.push(nombres_sueldos);*/


        const boton_enviar = document.getElementById("boton_enviar");

        boton_enviar.addEventListener("click", function(event){

            event.preventDefault();

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


            let nombre = document.getElementsByClassName("nombre")[0].value;

            let ingreso = document.getElementsByClassName("ingreso")[0].value;

            let email = document.getElementsByClassName("email")[0].value;

    
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
                                     <p><a href="">Volver al inicio</a><p/>
                                     </div>`;

            formulario_id.replaceWith(deducciones);

            /*const nuevo_ingreso = new Nombre_sueldo_email(nombre, sueldo_neto, email);

            nombres_sueldos.push(nuevo_ingreso);

            let nombres_sueldos_json = JSON.stringify(nombres_sueldos);

            localStorage.setItem("nombresysueldos", nombres_sueldos_json);

            console.log(nombres_sueldos);*/

        });

});

const boton_reiniciar = document.getElementById("boton_reiniciar");

boton_reiniciar.addEventListener("click", function(event){

    event.preventDefault();

    nombres_sueldos = [];

});

const boton_historial = document.getElementById("boton_historial");

boton_historial.addEventListener("click", function(event){

    event.preventDefault();

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