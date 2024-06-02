interface ModalidadActividadRespuesta{
    message: string;
    data: string;
  }
  
  interface ActividadesContactoRespuesta {
    message: string;
    data: {
      id: number;
      nombre: string;
    }[];
  }
  
  interface PremiosUsuarioConcursoRespuesta {
    message: string;
    data: string[];
  }
  
  interface PremioActividadRespuesta {
    message: string;
    data: {
      premio: string;
    };
  }
  
  interface ActividadesVariosContactosRespuesta {
    message: string;
    data: {
      id: number;
      id_operador: number | null;
      nombre: string;
      url_foto: string;
      localizacion: string;
      fecha: string;
      frecuencia: string;
      banda: string;
      id_modo: number;
      id_modalidad: number;
      completada: boolean;
      modalidad: {
        descripcion: string;
      };
    }[];
  }
  
  interface SolucionConcursoRespuesta {
    message: string;
    data: {
      solucion: string;
    };
  }
  
  interface ConcursoContactoRespuesta {
    message: string;
    data: {
      id: number;
      nombre: string;
    }[];
  }
  
  interface ContactosConDetallesRespuesta {
    message: string;
    data: {
      nombre: string;
      id_examen: string;
      email: string;
      usuario_secundarias: {
        premio: string;
        act_secundaria: {
          nombre: string;
        };
        principales_secundarias: null;
      }[];
    }[];
  }
  
  interface RegistrarContactoRespuesta {
    message: string;
    data: {
      id_usuario: string;
      id_secundaria: string;
      premio: string | null;
      updated_at: string;
      created_at: string;
    };
  }
  
  interface UsuariosRespuesta {
    message: string;
    data: {
      id: number;
      id_examen: string;
    }[];
  }