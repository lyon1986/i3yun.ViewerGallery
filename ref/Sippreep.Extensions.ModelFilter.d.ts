declare namespace Sippreep {
    namespace Extensions {
        namespace Modelfilter {
            export interface ModelFilterWxtension {
                /**
                 * 查询属性名
                 */
                QueryPropertyName(): Array<string>;

                /**
                 * 查询属性值
                 */
                QueryPropertyValue(propertyName: string): Array<string>;

                /**
                 * 搜索属性值
                 */
                Search(filter: PropertyFilter): Array<number>;

            }
            export class PropertyFilter {
                name: string;
                value: Array<string>;
                andFilter: PropertyFilter;
            }
        }
    }
}


