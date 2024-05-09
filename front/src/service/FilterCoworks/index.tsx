export const FilterCoworks = (coworks: any[], filter: any) => {
    const toFilter = coworks;
    const filterElement = filter;
  
    const funcionfiltrar = () => {
      return toFilter.filter(element => {
        // Comprobar la disponibilidad
        if (filterElement.aviable.length > 0) {
          if (filterElement.aviable.includes('aviable') && !element.aviability) {
            return false;
          }
          if (filterElement.aviable.includes('not-aviable') && element.aviability) {
            return false;
          }
        }
        // Comprobar la valoración
        if (filterElement.rating.length > 0 && !filterElement.rating.includes(String(element.rate))) {
          return false;
        }
        // Comprobar la ubicación
        if (filterElement.location.country && filterElement.location.country !== element.location.country) {
          return false;
        }
        if (filterElement.location.state && filterElement.location.state !== element.location.state) {
          return false;
        }
        if (filterElement.location.city && filterElement.location.city !== element.location.city) {
          return false;
        }
        // Si pasa todos los filtros, incluir el elemento
        return true;
      });
    }
  
    const filteredCoworks = funcionfiltrar();
  
    return filteredCoworks;
  }
  
  
  

  
  export default FilterCoworks;