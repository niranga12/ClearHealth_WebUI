import   FormatText  from "../FormatText";
import NormalizePhone from "../NormalizePhone";
import PhoneNumberFormater from "../PhoneNumberFormater";
import PhoneNumberMaskValidation from "../PhoneNumberMaskValidation";
import { shallow } from 'enzyme/build'
import DocsLink from "../DocsLink";
import React from "react";


describe('Reusable Methods Test ', () => {
    it('Format Text method  Capitalized Text should Be return ', () => {
        let Name="James Loury"
        const UppercaseName ="Peter Paul";
        expect(FormatText("james loury")).toEqual(Name);
        expect( FormatText("PETER PAUL")).toEqual(UppercaseName);
    });

    it('should normalize the phone number Ex: input (011) 566 2232 out put 0115662232', () => {
        let NomralizeNumber="0115662232"
        expect(NormalizePhone("(011) 566 2232")).toEqual(NomralizeNumber);
        
    });

    it('should Format  the phone number Ex: input 0115662232  out put (011) 566 - 2232', () => {
        const InputNumber ="0115662232";
        const OutputNumber ="(011) 566 - 2232";
        expect(PhoneNumberFormater(InputNumber)).toEqual(OutputNumber);
        
    });

    it('should Phone Number Have 10 digits ', () => {
        const InputNumber ="0115662222";
        expect(PhoneNumberMaskValidation(InputNumber)).toBeTruthy();
    });

    it('should Docs Link Avilable', () => {
        const wrapper = shallow(<DocsLink/>)
        wrapper.unmount()
    });

    



  });