<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      
        <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
    </head>
		<style>
table {
  border-collapse: collapse;
  width: 100%;
}

th {
  height: 50px;
}
</style>
<?php if (empty($data)) echo "cart is empty"; ?>
<?php if(!empty($data))  ?>
<div className="container">
<h2>Your order:</h2>
<table>
<tr>
<th>Pizza ID:</th>
<th>Name of pizza:</th>	
<th>Pizza Price $:</th>
<th>Quantitiy:<th>
<th>Total price in $:<th>
</tr>
<?php $total=0;?>
@foreach($data as $product)

<tr>
<td>{{$product->id}}</td>
<td>{{$product->name}}</td>
<td>{{$product->price}}</td>
<td>{{$product->quantity}}</td>
<td>{{$product->price*$product->quantity}}</td>
</tr>
<?php $total=$total+ $product->price * $product->quantity?>
@endforeach
</table>
<?php $totalE= 0.92*$total; ?>
<div>
<br>
<h4>Total amount in $: <?php echo "$total"; ?> <br> </h4>
<h4>Total amount in Euro:  <?php echo "$totalE"; ?> </h4>
</div>     
</form>  
<h1>Contact Details</h1>
<form>
<div class="form-group">
    <label for="exampleInputEmail1">First Name</label>
    <input type="fname" class="form-control" id="exampleInputfName" aria-describedby="emailHelp" placeholder="Enter First Name">
    </div>
	<div class="form-group">
    <label for="exampleInputEmail1">Last Name</label>
    <input type="lname" class="form-control" id="exampleInputfName" aria-describedby="emailHelp" placeholder="Enter Last Name">
    </div>
	<div class="form-group">
    <label for="exampleInputEmail1">Adress</label>
    <input type="address" class="form-control" id="exampleInputfName" aria-describedby="emailHelp" placeholder="Enter Address">
    </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Phone Number:</label>
    <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form> 
<button>
<a type="button" href="http:localhost:8000/order-completed"> Complete Order</a>
</button>

</div>





