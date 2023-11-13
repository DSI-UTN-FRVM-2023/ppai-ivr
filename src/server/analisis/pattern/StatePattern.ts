import { Estado } from "../entity/Estado";

class Finalizada extends Estado {
    private fechaHoraInicio: Date;

    constructor(fechaHoraInicio: Date) {
        super("Finalizada");
        this.fechaHoraInicio = fechaHoraInicio;
    }
}

class EnCurso extends Estado {
    private fechaHoraInicio: Date;

    constructor(fechaHoraInicio: Date) {
        super("En Curso");
        this.fechaHoraInicio = fechaHoraInicio;
    }

    public crearEstadoFinalizada(): Finalizada {
        return new Finalizada(this.fechaHoraInicio);
    }
}

class Iniciado extends Estado {
    private fechaHoraInicio: Date;
    
    constructor(fechaHoraInicio: Date) {
        super("Iniciado");
        this.fechaHoraInicio = fechaHoraInicio;
    }

    public crearEstadoEnCurso(): EnCurso {
        return new EnCurso(this.fechaHoraInicio);
    }
}

class EscuchaCorrecta extends Estado {
    constructor() {
        super("Escucha Correcta");
    }
}

class EnEscuchaConObservacion extends Estado {
    constructor() {
        super("En Escucha con Observación");
    }
}

class PendienteDeEscucha extends Estado {
    constructor() {
        super("Pendiente de Escucha");
    }
}

class Descartado extends Estado {
    constructor() {
        super("Descartado");
    }
}

class Cancelada extends Estado {
    constructor() {
        super("Cancelada");
    }
}