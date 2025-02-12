'use client'
import Loading from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { List } from 'lucide-react';
import React, { useState } from 'react'

const PricingTable = ({ pricing }: { pricing: any[] }) => {
    
    const [loading, setLoading] = useState(false);

  const handleSubscribe = async (prix : any) => {
    console.log(prix)
    setLoading(true);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id : prix.price_id, plan : prix["plan"]}),
    });

    const { url } = await response.json();
    console.log(url)
    window.location.href = url;
  };

  if(loading){
    return <Loading />
  }

    //console.log(pricing[0].description)
    return (
      <div className="p-4 flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricing.map((prix : any, index : number) => (
              <Card className="p-6 text-center" key={index}>
                <h3 className="text-2xl font-bold mb-4">{prix.plan}</h3>
                <p className="text-gray-600 mb-4">{prix.details}</p>
                <ul className="mb-6">
                  <Details details = {prix?.description} />
                </ul>
                <Button className="w-full" onClick={()=>{handleSubscribe(prix)}}>S'abonner</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const Details = ({ details }: { details: any[] })=>{
    return <>
      {details.map((detail : any, i : number) =>{
                    //console.log(details)
        return (
          <li key={i} className="text-gray-600 mb-2 text-start flex gap-4"> <List className="w-6 h-6 text-gray-600" /> {detail.description}</li>
        )  
      })}
    </>
  }

  export default PricingTable ;