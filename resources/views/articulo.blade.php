@extends('foundation')

@section('contenido')
<div class="callout">
<table class="hover stack">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Username</th>
    </tr>
  </thead>
  <tbody>
  @foreach ($articulos as $articulo)
    <tr>
      <th scope="row">{{ $articulo->id_articulo }}</th>
      <td>{{ $articulo->codigo }}</td>
      <td>{{ $articulo->descripcion }}</td>
      <td>{{ $articulo->costo }}</td>
    </tr>
    @endforeach
  </tbody>
</table>

    {{ $articulos->links() }}
</div>
@endsection