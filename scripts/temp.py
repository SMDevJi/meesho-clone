import json,os,requests
data=json.loads(open(os.path.join('scripts','productsExtra.json')).read())


#finished=os.listdir(os.path.join('images','products'))
#print(finished)
productsExtra2=[]

#num=len(finished)
for product in data:
    id=str(product['id'])
    url=f"/images/products/{id}.jpg"

    product['image']=url


with open(os.path.join('scripts', 'productsExtra2.json'), 'w') as f:
    json.dump(data, f)
print(len(data))