/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAbAAAq4AAPDw8eHh4eKCgoKDIyMjw8PDxGRkZGUFBQWFhYWGFhYWFqampqc3Nzf39/f4mJiYmTk5OcnJycpaWlpa6urre3t7fAwMDAycnJydHR0dvb29vk5OTk7Ozs8/Pz8/v7+/v///8AAABQTEFNRTMuOTlyBLkAAAAAAAAAADUgJANATQAB4AAAKuAm1ER9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uwZAAA8Q8A0WggAAgAAA/wAAABD1EZMewxDaBUvGNAAAr5QLkks20jkAAxwIFw+CA0PiApas+Un5fLn5d63+f/L/4YJ0pxLmhAKRAE0aLwDcT+iCaiPqlrIUI2bNjUYYpTQwBoqhKVSkYl97VGK191t3WnH7Me/Slb2OoIlo1jOtdys5/uIYdHQdYeA4ImdC5tCamt+BBaxi1HbIMB2gsUQHrNVxNtTfMRypxsZDM9JEcVLyPUOHqe79X/f5PC///7/tf0S93r2e+XXJYx0kdBdRcFZXWYuXUQKOEqf6aGhkxHTGhGgqnANJKwqNhiv1uuc4zqSWE7vJzT396c5ufK7RVNZrMVekgJbAcUChSKzsj9z0q/Lm0TgmMu2doyBWeXPv+149Pf/N1p+f2/n2F////7CsgnAVHCwHGgu5wqsVM31SypaKdXUNYlrjrjAXOioAcB////////////7X/79v/////////////+9voyU3d7E0KqEPR0eiCI0BC24lBQbGYGqIpJAmBQe107GYIBQjLIwhzb79C4XNDBIy2HWJnES6MgYwiijIJXbqCgmY1aZiFYBAdMABMwUDLxn4zZEzhgChNBQuYOAtOMCLgjPMaNAcGxAQATsEQQsPBiCU1VbETUbwZFQXZa1124U9lKmowMFBQGFGCm3sZhKtGmsL8QVhx+0i0bI4sR7DhEQz8GMoEDCw84RGKoe16BXJ5CphFNINYS9A9DIhEDESkYkDNAUPMFCxYHaErxeNPjhHGdySWNpXi8D/0zI8MqAgMBmRBSzGGMme1l75S135vGmiMZs6zrxeUTkU/CX5lwDBj/+7BkzgAD6z7OfWEgCCyOyOKgCABtBh9V+c2kCGEAZQMAAABADEBdsuGjm8b30hiQYhBHLzww5GrbxSZ4ZbD/f3/7zt6/+/z11mHBCaqFbOC6hdBM+q49L2nhtacHbpprOWZ8/XJvOT0n///rmH/////////////D78LQWopg7qm6cKu6y5FBJD//////////jn+dTOrumvem///////////////7P/FHiwH/6dzv+yUk1WIDXDAAFQDqoTJwxTYwAzOhSBJ5AAyYQBhzgaYGCRmOqaHFPKRWpI2NAx4p+udox3B9ikKZPB3oiC8AFwCyEEPOUvppq+Efzi4Rk8YZcz5XTMckr1eMMha7iqYsD/Jflgl7Chg3z+KY5kT000PWV/FVMC8KN8Zti26/4jU3aBPmtZNf23rPv7xtxsf/ea6xa1t//+80BycWBWPZ6Oe9ZtEp821rwNemd4x9f/H+P9f/7+N4mzTN8QPZ5Lmr+FuIPz1L7y7DzI75bEFCAMwAAG0QCEAjXIFxmbAuY8IjDQSJh0tcDJww8BwQCmykANbe8/iqYAC+crolFbm6kNBc9q1QqUixK0tEbBBNV0vzj77WMJIo/a1K1cgBy4ZTqs2laXTaCCNwhsTBWQRJnyRQqJRCkVtbkv+Dr9iy4lb1iK6/6///+TRA9xHzFX7VGOSLB4s2JI3JGy8O/+d7XlAIZGEpKH4ikgfzVaCw/TG5ylWaEE+VnTf97e9zd3P90xjEXzCjZOnC1dJFU0QdaTqpGjO3b2g+KUWRBwk2NCAABiKb0FBanGAIYTkgYKgMdhUVA0XmDAGAhIIwOooYcEy6lv/7kGTfgPZCaNV3beACAAAP8OAAARmptVHOYW/IAAA/wAAABCMyEQLIhdWvUgMCNDEaZMhF6B6kbYmyXKQyswEAkvAfiTlhrBRYvc1RAMwIas37+JKwG4M6dmOgE2JWYyBuEnVEBQBfklitiIX1nwAQ2TDP///+pbut0VCLTFNzHL0ety0KsLqn/44qnbDAXkxRxNJV0lLOGrJIHF5fLq4zare657rqPiojRUg/CrIXbTjZx6HJIohp3RSlWIaIJCzNkH40QRUQhkhBDAtd5DCxUINQarkQ2YiDAQjjhkYzFJTkIQkISqWXEoGayQP14Bwj697krR/zCPAcH60QHiWa1aAYdy46EE2Mc3Ty5SyhM6tKXjLfv1Hq7wIRRyliag7zVqB9HW1+5WCbUKD//////Tl2WHF0U+b1w7HJDp//1d2MHMMIDsWHnnGXA6GyEWpPdSO0i77JPhZRXqEm6GuMVB56ki5cJTvyiVQwIM/JMm2RBQsxcRAAFZCa8YIEvEVQ02f8dswAAC4WOwaVxjxGYEkIdwSPVb0yWA0uhRMAC//7kGTTAvYWaNV7j12wAAAP8AAAARaBoVfN4RGAAAA/wAAABDVWUWWCum27m9D85dmhW0unq6ZA8XVy0qt36yjkXoanGATmM8oYxaZnYZDGQTOv8SMYtGZRBbdJmkoFtcs1KemUQMBydPf/cc/9cMNrYe1jVJSlUc3z1/87XoRIoOBcAwLWwVJl2KpKiBijyCB5wpdT1M873/8/7lEHkjh6Hu1XrzTmu/UiDSnIHCABDKIAqGhYIMJBg8N4QEaBBakGiswUayYKA4VCwDnAwO3u8X6NJc6GlDBZMOVswsnmGCqEuuX6xeeXzlYgYgSlWMoRppdSpQ6USqXxxXtPelyaXbULTIDm2ovFwwbsU0baO6tugmnjw7S0uYfHB4C2pga0f///85s9HqXsrkjX5////uGcUD4EwyIuHUhCUUqlV2bTY4bTCcTW0V9/xtp//P9jRBgtZKieZLVRwHp4qH7+RaAFFjJlNAARtEoFhjUJsMMDjE66dhoRiw5DAUYSCAkAQgXJWkoCDgXXqVQKBm0fyqSBhs0okJfcCgL8NsCs2f/7kGTWAvW2aFV7eEPwAAAP8AAAARbBn1PuYQ/AAAA/wAAABMIu+0CfJVnLNnogphIr+TkPjLflcPXvtUjOZyWvGrqlvOuvN/kaCgZgoUEgqnpGtulyK5b5b///X////vaX+44qQo1Lt9suzxueeV11j5IfVB4qAIBzBxcPm5llGMhsd1SVWzkrz+Bfyzpf/+iGQXZSaahwhGM00V77ImMPEvcT1JAAowYmJkADwJGGxQYWJYqAjBxNOxGIDBEwSEoQYNCCiIcIi6AwCCYDV8IDGgS+QgRwfNayD5IK/qp07XUOBCcoBultSrwSAccRQHIGk+eMRcXt6N7jRsX27WFGUBTTSWEIoKMSj2Q0UIh8Dtma576q53d+ubNGHUNTQG4wTp1PH8x09r9CylMHuPCYQwwSI4UD+hOIoxWTpvi++amYm5mIrXv+LeCL3pYq7GMNNimFbSsVJCZYq5uNqXAHOVNBVABakst8YKA6ixgA4Hkg2JBAXGYImlhN5WAqQDFF3ogKCOj1YYfjYdaGu2Iel0MuXLqaGaa2hrXpw7D51v/7kGTeAPYDbtV7iR9CAAAP8AAAARctpVXuPQ+AAAA/wAAABBsPIAwOlzYbR9YSzq72GxtcPKXaQehBHBBDyTZUNiUqpcZb3P89c//y01ZdxWyz/O9U6xX+a/+W3LYqHe5E0JRYfHa84bmp5BSVqe9v///833J5dCTufec12Mla1FQaI2Qk0BGw9WiABEdhNHARfhCMIBExqBmKmQR2dEBsuWaFmBcBEpaJZN0UNUQ0r5yhgFRZ7viLfb27iVl+djzRjQl8SaDTwrdgYFiR8FEjhz9+7rwweh6JwAYgCIWI1Eu9IgesNPi+tpqRe2WuUvrsOzShBFg9AWQBMOk/+v762chBpA16cbxUftCoaqStR////CionZw4OgUJLHihAj9KIARZVnZEE34SlMRGBhQLmSb6ZwIaNyN41YKCRKLcA7kCr+IbjpGhNIFbg6LkQS7sNxCIMIvZY0B5VPMLg7DStk4pvWIo/XLUmuVMqZGTGZ1NAaQTy0+WrthD6cSZRtkw79iZ+bqP+Y2qmhxEpNTxQWQer/+eXuiIk2tA1UVXcf/7kGTfgPVIXdT7mFlwAAAP8AAAARLVd1XuYQXgAAA/wAAABOWajBuay5FY858XDImueP/iZUJdUXTF5+1lHlNsAIcGyI0Ek8KaFQCLAMBnNf42HM0EgcFIA6ENuCAaCc6URi4kEtciymMZkWb3ZWJIgbA1mG4zaBlaT1jsxqHpjK4juHA+fa/vx9eDVzTTzzTK094dmANMLr5auW+ThYWR4r6mk7//9Mk6DQnD09ihBFCf//q+mR2W3HuqZQuOLYUKIo4wOGGC5NN3wlJzKRki44wOgeMDqxYPxEFxBhGdMCSIOjScpb4AkqhQHkoaMXXodFyPIyEgQAxQQKUA0FJlT98SBphEDmCgOAQG1K/aiOopi5bFF2NbsUV21y8GAr74fjbHBVc3CcsITNa7ZyKHpeXQzU76khSy1lm9i3ulBgobLDkntFXK//9jqRjDBQHiHC61///MdyQrwWp8rOtCIScUYruXUXf//t731KCRJUXpyTqHi8DXACiRlDRpu8gEwsGTE40MABU5LHQM7XeYgGDNWQHChhyT1LdBwGEhkv/7cGT+APTbXtV7mFl6AAAP8AAAARP1eVXtsRUoAAA/wAAABMESAIm0dSDcTj1jcFS4t+LWxir6bG2XVn5jvJmxNvYsCfXrmt9XiR5Yk29HaSIhsPcb7tHtTXEIOA7P3HLMYwWta///6XRzCSxUHa////RoxYcKihYuIjDiTAo4dg+EZqDorni//5+FW6FxxooII5SBZyBYRjHV1YAgeBNkTTXdAJS4wkBlOTrAhMXhlAxu5EHlhxoIjoLSvuwaljFY2keRAB0n7m6SXw3NyaPxD7NSh12Bb31MIcmE1IHipOA0DEilQruqKOUr3VbElS8/ZgmEAeweP6sMXeyCu6qHlaspf6X232vv//SdyeVkw0KxhDT/6dBOmUi8iTzElGSHmcJMJu5idIdSRsk361oKUTlpJlIvmBn/+4Bk6wD0xF7Ve4xFSgAAD/AAAAET9XdR7j0P6AAAP8AAAASikcl9M2UgbEFABpDIUGpxdAEChQwEIyyR4tBGJQE8gIAgsSiYPBhpQZbnMpts0aiw9xGJTr7NwP1pG/VaUcK9U+pmZWHU/9btbMzWalXJWOuzeQzzfOv73SEK72DXMJ+zqvFK5upzTT6jGWEkMk42NXm+2gLZWrg3z/E3Qsnar3v5v+eSsnLNECQJmas///5mkEZNDU+SyWIEmJkClQJZ1rhKQ5ohdPd8/82pWT1lyvuWycUeXmpRkRtlcGKJZERNt74lFbRVIdpNgYKRhhZliM2LA7ORUhCfHlwNciTTGDuM19OZ9xcYNlanoqhxaVWvoWnC18R1Q5ZXSeSzNuFXE8+o2sSY/f6b4FJfaC2FhOsNFDB8q5BMBaok8Q6DxUY4DwRoSJDTRT5y9bWDqE56dxsjllCAErYVAMDUVKn////vziHGigo9Bf/7gGTzAPUuXdR7jG46AAAP8AAAARZBcU3uPXHoAAA/wAAABMPhUGoDwgGC5zJMDnZBeoIqqRtEOoYNgQupGFgkqlObUDOmZ2ZvvisVUGzInxmOEoTNChwqDqLQEWBEMvrwLg3HMfVwljgefYHgHxqPZDmg+2mVWH6Tg7qq4H00YLSUB4rWeNCzj59jXzMUUkknO0v/VRNTp01OonTZz3Ijpa81duvb2aqmszHUapqctFbrG4ui////v+o2mtSa3SR6aNja57g2PONjZrW1+50G242tE63iCk3SqgMDqslLZVYSgWnLCoLTDFlCbyIySNSkyQEwwqA6CCwOHiCjYYmCINIBhgAg0VGDgwEAhK8xAMUchGNoBCErAKhBKEBKgp3CZFIDQsYDFHQuxdfsYE08BUaytcPgMhNSVyLnUYiENO4kIuiyuxdk3KVOCIa2JFTQXpYOxAgGGXjZuhvLkVFHgAJhSFaXbOaRmrxQ//uAZOuA9XBb1nsvRHoAAA/wAAABEsVnUfWlgCgAAD/CgAAEdys5Cgag794Z7tR2Ts2SrZO9lS/3Uxhb7ttLkOW+0iRaYcDtfjDX2oT0YcSJri/+f/dfn/tbfup+87dyw/kOCEaTUrNAlMUa2ds7VOX4dv///5//////AkUz/DDCG4ftzcP33bceQrvns5fK5+i7I5BDFaBZP///////////////////2+87rDuHPw5//////////flmG8O55asXCOCVjBIAASSUEMFHlfms6ZtYGYSFGLgpbsHBaDK0UrHKaEXZncnLiDtP1L5VLpi9blb6Y2rr9w1RsgQ3galvynVJHb0Sey9GnjSri0uo5e4LEZbG6kxK4rCKBhwiG/LV3nYjROy8EbsfTVKOlw3Vs5UsZvVrOsvrZ1X9pMZVFqtnC7LeY///+ONLWrXMrtX9y2mv97TWsu1quE1FsasauzMioL+eNamw1jydlUX/+6Bk7YAJeYfV7nMIggAAD/DAAAAZbUFTnbwACAAAP8OAAASoZ3lGKGZ/7//GhS1MLHa+Seo6tR/BuPOLYgmJr5/9WmAAxTJgIAAUgAtUAgFDI5iEFmKaQSmmDhnieICIaLWByiSiwXcmSqAoDXYjJaWeyiD5/EHqgTKw7m6RmAsBbhtP2et0ajMrlCfkPWH5KgI2B2Hdi8jrtZhurMcpqj1RhrVMplOfBsZx1Sdyw/UkhxIjT0xWf67s/nzL/f///tZsO/9tJyFkCkGz5TquRRZyBMIrlROb5lmZkN09P+8ZG7/3rdiYRkQZjgZDnOpyEEMZ1t/s/bFCriZCvVwMDtDIZgALxtBYqZAu8J0wBphAQqBCwnIhkwACgQiL5u4AUoOGRduBggc1kWJZ2pC2LWzkLCsqd/FxAW4x+Joyrq9sfQE82woh1klT6qITDQ9cK5sZVdHj3pAPwkJqnCd5knI4q5vj43TQVEA4QXuV0jq+Pr5i+r4v14xGm+Fsm6GATgRA+HdVx9FOrqLDdxGIEAkdlmjh0rVrcuqQzT///19vEu7ono6IMkvKPRCXityaoFB2VSEwABoyTBFzLln5J0hlAIILCLcDrpEPKpIBOI4xowwuBbggDKXVJ+S5zlW2XQt8GZcG16HIqsH+Oqy4RLLAQhDoJP0kdSfEzFhOgvJLVKT9JMzOl5v/+5Bk4wD102nU+2YXsgAAD/AAAAEWRaNd7T0PwAAAP8AAAAQxHNWoYaiFIWnk6vKSWviY3gWMONR/u+tWLFkcRXJ1I48VS52FxEagIAwmUVa/yiAiynIdXV2iSMhCTq6mP2NT//2qIEY51iM6C9Q8wOHwCBzMCoK6O5IAAvY4rcVVywkOrlniVk38V+qfIRhAIDsktFa7EXCC598DQBfqH0NVxDOH6BOa6/2QBUrkXRryN0JNb0LxGVguA4lEgfX8RH3t5ZYPZ6Igd1ZHskxJFvUrPB8TRFxH/1HS//5URP9RcogweiEI6MJhPUOv3yiYiQ4jCrCyuPWhcpx8HjIKkw0aOGybKFW7X8f8TWvtCM90klMpBQhgMCEUkRexy4TUbj+6gEBmNjEAABoiS1wGMsmCZQCJAhWa5wpeyoyKtQ8mOEAZ+p2PiwqLogHVdFs1YBk1wpHKrf9YOltRZKlXRKRoBguSkSg4jvCrNw/zncnTOrrUrhXnQaSkUBcn6TTzOwP3V56/GxHb6/4+/r/+qmf/+mIQsyoGjzxGFpB3vr//+5Bk6wD1VWjXe08r8gAAD/AAAAEVva1h7LERiAAAP8AAAASXVCGDuBURDiS+6W0nXr+pa2r4vv///6/+JbPhBDPcYlKJ0MFzBdi7QamvygAIh1Qj9SIqBM0wFT4CnP+IChxg7zERoGnBoILFjFk4dfgYBRd6UEDUqdo/yJkcY4E2Suulgk0SB7VKJbjAcGywChRjGstMj2Ps81fXsYNER2IS5IoVNks+jbenOmTInv///4/irV+5/mZQoeKdPA/JEcpvr/6saeSIAoPCYxxtmprUj5sndbVjbp45//////+PVWF3VKrpVY6yXQBsXlqKgABHd1MgABkABgURiEvLBGekvwLrTOgAidTNMMUHVMnLqAAN9l5gOashllW5t2wq69Z/RULkyboqJNaZTHjAPhxgIklyvLNG1rF1LGupENaCeA0VSvkfCbCkvZDGbDfrdMQZzr1xHa2v/e82nz/1ixppzMTAenDJbj3W4VTShYHgnFh4loaQLJaFSTQ6jpdWMUk8aMu0+ERaSb+6/9HqzDSyB4hDzRKOkMmlDDoBK2D/+4Bk/QL1RGzW+09D8gAAD/AAAAEUIatd7TERiAAAP8AAAAQAaMSGHYAEC9kRYokTThVbGVDRZmY0hfcRBxZQzFuS4s7CB2cgaDJo/GK9zL8qPVR+cZtnNLAagU/BC0aCA3BnWtpHRp4E+bOePKSQ/K4tHoaVqlk0xBq7ptTgSIOvJqkOS7veaOJEBFY3eStaZRNDd/UQKBK5W0TRii3P/jGJRSJ8XMCayENTLL3JilCNdRBi/NozFuRGjcettbeMbDY+2Kz//7tTmrKWEpSyym9haNx5Z/6qgAASQSAAABgAGUAIhFaMoXXAC0QFwBElJ0mGaxUDVDZcKBShViHmPyi05u4/e+IbwjE/uasWm62JlO2bkBUBH+6QgcY8dEYi+qWzVqaA/txulzlsYh1i0qd1QeAYaa5Wru/rGH8O4d/oqplr0fz///3YmtEuqPql0FyuKEFw3XTTAvfaa2KZLycpwvIyi/PjvnMZDv/7gGT8gvV3atb7L0P4AAAP8AAAARatoVftCT5oAAA/wAAABD2j5LR33/wSTFcgFmhT5GaflZ8/LYJGNj+/qwAFMUZCIAHhIEaQlJkGcSEvsMyAhauFpotVmkGYP9jQb0Qwwy20SMZj9Izv5HeV0+7W4204TQWfn8jMMJNFYiiTvT1PCzc4aiz9TVmLq9VhgpYeAwYQOgrMP2xURW1ln/T9Gnb8wkYelt+7aTMphYRESFD4JHshjC6SFc7Co46lFnMhlRHLypVjEMSV9lt1ZkMoqHUIpi++/pr+cargB/lyEADUBNJCosKT5EIvcIUQevUYZkWKUTgoGmOBCPIyMDQPD9UPSFqs1W5rRkWI8rpVbgstOpYUJujxWdNMx8tDMK8qmEtqzSC8vWej6C3l+bYZygkQIwmtjb2/ynkmv+v7///2umvr+Rir3yvr8X6lQ1NRPYquHoikixIo800sSYPQdoeg9eal2rWIUYxx//uAZO6A9XRu0/tlN6IAAA/wAAABE6GdVe08rcgAAD/AAAAEKiCOthUZbNH91C8Gyp0TZwqNS1StkhsX8sEJG5owAP0UYUHgZWMMbzxlYABZg5oYcgseTBMHAUx01xUD0/bWAEPwWJyM9fakej2VGvoTKr2uBGvGVuN4hM0OCW0bkMTUoIKXRaccGR59Yr7Qn0iuQpXp0yYE6i3GhVx/+LEyhx6vRSG2depOy1HNa1M/EuJBbr+vmoaWtVHMwjAYocnmUgw8OQ9FRxUR9ey1qaqQLbQQrpTrlMtrBS6/xfyvquScTUtVwI/ZViAC3SYjBDBCUGCB5WaYuDCEhMZViIHDEUQD5eIw4BdsOAUi4kOgiYZihUj80hUaArjSaIG6XvXdVPWz6/VJkk2E/BchsCfi/GsXVLM6KVDPfGN03e2dIjBdmNKQL5p/XXOkeSIAurK9DCU6qVzfbb52sesycP/r///i2GxAg0NA0uD/+4Bk7QD1UGtT629D4gAAD/AAAAEVJaVNrb0P4AAAP8AAAASBQmpeRdB/Y2nep+eblSdw9Us16Eom5IPM/91AHZJkIAN6TMEwiMNgvMBwwMP4aMsBEMCA3MHgUFg7MBgTMEQDUFUFh14ktlb2DMOZS3COxZt5RLIjA8PxaXYbzrVZma3W1jcj0HoatNRvR+FgLZY3q+njhEDB2EwWEcvp/lxBEMCJohg2DbttdKKmkM5qEPffP8SYXwj3UWtvkHSk/////9vUk3NSAD+N4pouGwf181c6zbr74QfLH3LGNSuai0XA0GQ7/1mlgBNZCiACnRqCUwFBgkBcxHew4MAoiG0AgqnuGAwiWiKoEBGFEGfLSHtMQjDDVLWpyexALzyN/n+hHKmV2/Xm6lm52xGmRJxK1MgeJAEzFNZa0DurCQFQ8CIPGi/gdnCEWGBY0YrpC2gufJIvayyL6/A5RYm4UuW0i6QYqS//////zP/7gGTngPUHXVLrb0P4AAAP8AAAARV1a0muoXrgAAA/wAAABCriwBThEAIAnmLOrfbNf/1f00W5ZldwPHqwu0j/UnAOZgFsAPdmAwBQMGw8AJgWQx1y9pk2GpgwEQQAYiAsoEYOApCl/jBACQ4D66WocALTJzFr0njlDAKmFyQy7tWvlTcnvy3hXm4CgOHXBXK1horc3ViEbvBc5fvqeNRU0HBEEVyIG3oaLB4IZAu4oSbcKMp/IUuod0m70mOOKn//+iFYPAGCAMNOHTv8tv/zDRweMFiJjILNUsAFgglQEr+GmMSgqIAAMDRVNgi/Ou0RI9l9sZMtw8DDUFddgQBEQArPdZ/G6xanIxwo4mAKZRKC7UHFSvyvNCsGrECIWB4MhBlNCHiVZr7LbdflI0CxUNbPp542Dr9IIqQbohqCWyy39mqz+oVku1sanJ80sn9+/369/+6WJhsQEqUkD2qfc4f///////4pJtQA//uAZOWA9QJc0eu4QvgAAA/wAAABEw1tSa6guuAAAD/AAAAEhlfROAGkBU5Un/MMBgJEQUIIwoGxheLRv/AgsNrPgS04iBOBGVACIBw4FzE03ULkrS4yodNNHdKGFh+q8wGZJwv/7Q2uCujoiv8sTmzzxm+Be9/B1e1feWr6G0WxD38NzdEamJcpFupEcHk7PFj0h2iUvArmsH//X+c5+de/pSmMa+cbxmNHeZ3VnU5xCcwT2hHI8TjpaaM13ivx////8SR2JMn4dCoiIp5dPucN/ir+7vYBBYNg5VAAk0MVTkONERJAgBmykogZgoGVMYbMp9BBSg09YNDCZWTkX01NkbM2tOTRWKBv33lvJqn+Vv9Kqsci7l9z1R1QvNBB0IgHELthoaLVMx7KyopOPMzI4iofe9a6XVVK31B1SLuPi+bnumfvtA0JjOvPxTL++bMCsmvuAcirvqSDOnDoUJd0EnIZeh8KUsbITAr/+4Bk7YD0q1nR67lJWgAAD/AAAAEWiXtHruHm4AAAP8AAAARGyC/kgPGSdgr8z5nyhLEISDTCWFsLGYhb0oWFRH6pn7pxy4PJZ4FZG+O4WXaQlVCjL+UCqLfi//pmPq0uJ4mwmCZnxY1iAMOiQzVLXsAgkgXEYSKkpkTGAZ7HmqAEIGBI0iaoRCILijbPwzNsqxWA5oieZ3a5jTIWc6bpI8rnea28JUqmAhyqTqUrLVbXcHDzMWvraHesTVPXG4NfaFLFet8MlyLC0E/E+ISLmVThpnuy+///pBKETVsnd0fSlHC95aWlJ8mrAjgnnjzykmkCVEKuIhcCYRRqG4cj8Dgg13m5s+FHV9ug7uc5ZrnOi///53TTpb6NIwZvMH/klcgJpldmPSb6gRGY5FwE+DJDTABr46oXyCxRglpxkQb/olSZFeNPjqw1yXwZSPvG4hFmIMsfQmFZE3eN3b0pwTpw0tj2lGCrImQVi//7kGTtAPaxcFH7a33YAAAP8AAAARcFo0/tPXHgAAA/wAAABCFq3IZ5jbk44inKDapi+0hvyLES7Q0BRkCSMZRSTVjKPlO///BpHue9//jlSxWRLHWmTNiltChSNaiHg+JyiKYCyBaIoZjcVhuczP/8+PTHTOf/zTVZkOrQ4mNGYIQ5mQkAklVAyVwvOkFCq9DbnUhwAhkcolQTSWiseS/am0x2KWVs7gaWNbZWzdY6bzoq0xkywpLOVMvlOhMdFIWdqDUJUgT1RHImIGDMm4QMFAoTCqOuZct6/7rD0GwKg+O/1hISIv66xQNgtKbr/45klTVJDyVKKGkhyZAZENjB6Cx1iCDwC13qvX//+0MxzQ3/P/Mf3N/bLNFioqxKkzN1UwABHLqnxAAyKWaFpiBoAuA1wSutIAxsIiIXOkpTHH5UNp3rkDaOu1tcSe5jYwh1Z62H89+MZHQotxYfVqQNgooLGoeDghACAip5NEQQJS4gkpLkwh2Eo85x8wgOmS+8cdzF1afCCx0N1/z85h3aWQVRpEQc6hyYTMD5BqJxVf/7gGTkAPU5Z9R7KVXqAAAP8AAAARPRo0nsJRTgAAA/wAAABGWVd+LjUO8WuApNrwcEoVlzaHQiAFtd/cCBAONSqEd5aQ7TRtpIIvqhCIwS1BMOsMhNZ7ZmHSgp/YcgpN9aYqAnO7snmsmn+zOX0bWRvLoEUN3n2D6MyOPrstIZwHzULG2WIk2Ha/+/ZjbBVxqL2gzpnZiGKpNU81Od9r/OUUK3K2qoKMUDRwIMLCMCDBwIQ4KgNYQzZUIACWy/3gKwIHo1GIYQ8yCHtoXF3wFIHFFnBC4DZS60RaI/S0bCZlIu0FEZGIAqku/23WVSHy18WMyWkmjvGGZ4q42ma932d1puZW/cSzmwJWRkpd1Af0a3lGpWPCTqF1Fgx5fFg4hwKoy2C1ZePrQ+Z/H/b9vrsdaPnpkcRZr7bkkSJWkuL0cbTJbD2YESjju9E2Jvb0MkasHwpE6VWR44iAXYWmpkvxm7eMuf32vJNKIm//twZOWA9IxO0nsINXgAAA/wAAABEF09TeywdSAAAD/AAAAEL6B6CdImAnymLRFUhRUHe1WLkMDCj1ZbG7WtshrzYJW7JVoLJMoZTWRNT2Dly40JKJk42lO2cgZgT1FMVs989a71rM20+6yTkTTmJErRrHiAJJjpHPIVphJTVBAZLZvwE7DDkGDCyyrAVADhOikcKFMAZcXOcqjgN8YrKoAe6YUpf1nLyGSUs4vPVGgfeQ3vVsUy1Uh7c39d7sUV7JH2WMQUcbix8hWeUt1qzZ2G2L4hmf0imPb5q28m0ByjEADR7ftjnX95bE5Fbupr9e818KUYh4kQGW6X8AqCBoBpDZxwKegWESMlQCA7RRBdS90Ar9rcUwvUzHBEDGEdSyYV6XLcTNXQ64zK8zoDZFzzNqwbZY47tv/7cGTlhPR7UFF7DzToAAAP8AAAAQ+dHz+sJNVgAAA/wAAABFyxUsUdK4qNvuOWqxmS2p1Ynv1ptu2u1+2mfu6ZODDcZh3DbiLP3q9/LfnxZad5Z6ArMZVXt+tkAIAAAMRHjkzEsMpzBOYgSiIQMVDTSGQ4dALDGOEIMESINMQBwhoNQEjJgEydcbqCUQ0IMCZNnaMerMVKKAqZpE1b2AQoUC4IOBBgt2GJtigBUrBm6V6aZpE9V9OE57J1boZgOSMf+VV8pTBK9EnCoDm5WuGIT77UUD3Msvy3FZQ/3zH2Icmo6CIOe7kv//////////qWTEFNRTMuOTkuNaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+3Bk6YDzyDtQeww06gAAD/AAAAEOGNFD9YYAKAAAP8KAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//tAZP8ABQ8sTH5vQAAAAA/wwAAAAAAB/hwAACAAAD/DgAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=';
const soundByteArray = base64SoundToByteArray( phetAudioContext, soundURI );
const unlock = simLauncher.createLock( soundURI );
const wrappedAudioBuffer = new WrappedAudioBuffer();
const onDecodeSuccess = decodedAudio => {
  wrappedAudioBuffer.audioBuffer = decodedAudio;
  wrappedAudioBuffer.loadedProperty.set( true );
  unlock();
};
const onDecodeError = decodeError => {
  console.warn( 'decode of audio data failed, using stubbed sound, error: ' + decodeError );
  wrappedAudioBuffer.audioBuffer = phetAudioContext.createBuffer( 1, 0, phetAudioContext.sampleRate );
  wrappedAudioBuffer.loadedProperty.set( true );
  unlock();
};
phetAudioContext.decodeAudioData( soundByteArray.buffer, onDecodeSuccess, onDecodeError );
export default wrappedAudioBuffer;