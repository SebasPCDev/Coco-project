export const FilterCoworks = (coworks: any[], filter: any) => {
  const toFilter = coworks;
  const filterElement = filter;

  const funcionfiltrar = () => {
    return toFilter.filter(element => {
      // Solo incluir los coworkings con status 'active'
      if (element.status !== 'active') {
        return false;
      }
      // Comprobar la ubicación
      if (filterElement.location.country && filterElement.location.country !== element.country) {
        return false;
      }
      if (filterElement.location.state && filterElement.location.state !== element.state) {
        return false;
      }
      if (filterElement.location.city && filterElement.location.city !== element.city) {
        return false;
      }
      // Comprobar la capacidad
      if (filterElement.capacity.length > 0) {
        const capacity = element.capacity;
        if (!filterElement.capacity.some(range => {
          const [min, max] = range.split('-').map(Number);
          return capacity >= min && capacity <= max;
        })) {
          return false;
        }
      }
      // Si pasa todos los filtros, incluir el elemento
      return true;
    });
  }

  const filteredCoworks = funcionfiltrar();

  return filteredCoworks;
}

export default FilterCoworks;